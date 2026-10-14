"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { estimateFromSettings } from "@/server/opportunities/spending";
import type { RunSettings } from "@/server/opportunities/settings";
import { trpc } from "@/trpc/client";

type Overview = Awaited<ReturnType<typeof trpc.opportunities.overview.query>>;
type Detail = Awaited<ReturnType<typeof trpc.opportunities.detail.query>>;

export function OpportunityDashboard() {
  const [overview, setOverview] = React.useState<Overview | null>(null);
  const [detail, setDetail] = React.useState<Detail | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [settings, setSettings] = React.useState<RunSettings | null>(null);
  const [presetName, setPresetName] = React.useState("Houston 30 days");
  const [importBody, setImportBody] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  const load = React.useCallback(async () => {
    const next = await trpc.opportunities.overview.query();
    setOverview(next);
    setSettings((current) => current ?? (next.defaults as RunSettings));
  }, []);

  React.useEffect(() => {
    load().catch((reason: Error) => setError(reason.message));
  }, [load]);

  React.useEffect(() => {
    if (!detail || (detail.status !== "running" && detail.status !== "queued")) return;
    const timer = window.setInterval(() => {
      trpc.opportunities.detail.query({ id: detail.id }).then(setDetail).catch(() => undefined);
      load().catch(() => undefined);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [detail, load]);

  async function openRun(id: string) {
    setDetail(await trpc.opportunities.detail.query({ id }));
  }

  async function runDemo() {
    if (!settings) return;
    setBusy(true);
    setError(null);
    try {
      const created = await trpc.opportunities.demo.mutate({ settings });
      await load();
      await openRun(created.id);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "The demo run failed.");
    } finally {
      setBusy(false);
    }
  }

  async function runImport() {
    if (!settings) return;
    setBusy(true);
    setError(null);
    try {
      const created = await trpc.opportunities.importListings.mutate({
        name: "Imported listings",
        settings,
        format: importBody.trim().startsWith("{") ? "json" : "csv",
        body: importBody,
      });
      await load();
      await openRun(created.id);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "The import failed.");
    } finally {
      setBusy(false);
    }
  }

  async function runLive() {
    if (!settings) return;
    setBusy(true);
    setError(null);
    try {
      const created = await trpc.opportunities.create.mutate({ name: "HAR sold search", settings });
      await load();
      await openRun(created.id);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "The search did not start.");
    } finally {
      setBusy(false);
    }
  }

  if (!overview || !settings) {
    return <p className="text-muted-foreground">{error ?? "Loading the opportunity desk."}</p>;
  }

  const estimate = estimateFromSettings(settings);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10">
      {error ? <p className="border border-accent-ink px-4 py-3 text-sm">{error}</p> : null}
      {!overview.database ? (
        <section className="border border-border p-5">
          <h2 className="font-display text-3xl">Database not configured</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Connect Neon Postgres and set DATABASE_URL. The form below shows the defaults, and provider status is already visible. Runs, imports, and the demo dataset need the database.
          </p>
        </section>
      ) : null}

      <section className="grid gap-4 md:grid-cols-2">
        {overview.providers.map((provider) => (
          <article key={provider.id} className="border border-border p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{provider.configured ? "Connected" : "Provider not configured"}</p>
            <h2 className="mt-2 font-display text-2xl">{provider.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{provider.summary}</p>
            <ul className="mt-3 space-y-1 text-sm">
              {Object.entries(provider.capabilities).map(([key, value]) => (
                <li key={key}>
                  {key}: {value ? "allowed" : "off"}
                </li>
              ))}
            </ul>
            {provider.needed.length ? (
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
                {provider.needed.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </section>

      <section className="border border-border p-5">
        <h2 className="font-display text-3xl">Search</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Exact sale price, last asking price, and a reported range are separate. A range matches when it overlaps the filter. Unknown prices are dropped when the selected basis is missing, unless you allow them. Strict property mode excludes a home when any kitchen or bathroom strongly appears updated. Room opportunity mode keeps the home and designs only the outdated rooms. The default waits for review before spending on images.
        </p>
        <p className="mt-3 text-sm">{estimate.note}</p>
        <p className="text-sm">Estimated processing cost {money(estimate.estimatedCents)} · cap {money(settings.maxSpendCents)}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <label className="text-sm">Sold window
            <select className="mt-2 w-full bg-transparent" value={settings.soldPreset} onChange={(event) => setSettings({ ...settings, soldPreset: event.target.value as RunSettings["soldPreset"] })}>
              {["7", "14", "30", "60", "90", "custom"].map((value) => <option key={value} value={value}>{value === "custom" ? "Custom" : `Last ${value} days`}</option>)}
            </select>
          </label>
          <label className="text-sm">Price basis
            <select className="mt-2 w-full bg-transparent" value={settings.priceBasis} onChange={(event) => setSettings({ ...settings, priceBasis: event.target.value as RunSettings["priceBasis"] })}>
              <option value="exact">Exact sale price</option>
              <option value="range">Reported sale-price range</option>
              <option value="asking">Last asking price</option>
            </select>
          </label>
          <label className="text-sm">Report size
            <select className="mt-2 w-full bg-transparent" value={settings.targetCount} onChange={(event) => setSettings({ ...settings, targetCount: Number(event.target.value) as 10 | 15 | 20 })}>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </label>
          <label className="text-sm">Minimum price
            <Input type="number" value={settings.minPrice ?? ""} onChange={(event) => setSettings({ ...settings, minPrice: event.target.value ? Number(event.target.value) : null })} />
          </label>
          <label className="text-sm">Maximum price
            <Input type="number" value={settings.maxPrice ?? ""} onChange={(event) => setSettings({ ...settings, maxPrice: event.target.value ? Number(event.target.value) : null })} />
          </label>
          <label className="text-sm">Rooms
            <select className="mt-2 w-full bg-transparent" value={settings.rooms} onChange={(event) => setSettings({ ...settings, rooms: event.target.value as RunSettings["rooms"] })}>
              <option value="both">Kitchen and bathrooms</option>
              <option value="kitchen">Kitchen only</option>
              <option value="bathrooms">Bathrooms only</option>
            </select>
          </label>
          <label className="text-sm">Exclusion
            <select className="mt-2 w-full bg-transparent" value={settings.exclusionMode} onChange={(event) => setSettings({ ...settings, exclusionMode: event.target.value as RunSettings["exclusionMode"] })}>
              <option value="strict_property">Strict property</option>
              <option value="room_opportunity">Room opportunity</option>
            </select>
          </label>
          <label className="text-sm">Run mode
            <select className="mt-2 w-full bg-transparent" value={settings.mode} onChange={(event) => setSettings({ ...settings, mode: event.target.value as RunSettings["mode"] })}>
              <option value="review">Review before generation</option>
              <option value="automatic">Automatic</option>
            </select>
          </label>
          <label className="text-sm">Image quality
            <select className="mt-2 w-full bg-transparent" value={settings.imageQuality} onChange={(event) => setSettings({ ...settings, imageQuality: event.target.value as RunSettings["imageQuality"] })}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={settings.allowUnknownPrice} onChange={(event) => setSettings({ ...settings, allowUnknownPrice: event.target.checked })} />
            Allow unknown prices
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={settings.allowLayoutChanges} onChange={(event) => setSettings({ ...settings, allowLayoutChanges: event.target.checked })} />
            Allow layout changes (feasibility review)
          </label>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Input className="max-w-xs" value={presetName} onChange={(event) => setPresetName(event.target.value)} />
          <Button type="button" variant="outline" disabled={!overview.database || busy} onClick={() => trpc.opportunities.savePreset.mutate({ name: presetName, settings }).then(load)}>
            Save preset
          </Button>
          <Button type="button" disabled={!overview.database || busy} onClick={runDemo}>Load demo dataset</Button>
          <Button type="button" variant="outline" disabled={!overview.database || busy} onClick={runLive}>Search HAR</Button>
        </div>
        {overview.presets.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {overview.presets.map((preset) => (
              <button key={preset.id} type="button" className="border border-border px-3 py-2 text-xs uppercase tracking-[0.14em]" onClick={() => setSettings(preset.settings as RunSettings)}>
                {preset.name}
              </button>
            ))}
          </div>
        ) : null}
      </section>

      <section className="border border-border p-5">
        <h2 className="font-display text-3xl">Import</h2>
        <p className="mt-2 text-sm text-muted-foreground">Paste JSON or CSV. A source URL is stored as a reference and is not fetched. Company project image paths must start with /images/projects/.</p>
        <textarea className="mt-4 min-h-36 w-full border border-border bg-transparent p-3 text-sm" value={importBody} onChange={(event) => setImportBody(event.target.value)} placeholder='{"listings":[{"addressLine":"1 Main St","city":"Houston","state":"TX","postalCode":"77002","closedDate":"2026-10-01","exactSalePrice":400000,"photos":[{"publicPath":"/images/projects/kitchens/coffered-shaker-kitchen.jpg","roomHint":"kitchen"}]}]}' />
        <Button className="mt-4" type="button" variant="outline" disabled={!overview.database || busy || !importBody.trim()} onClick={runImport}>Import records</Button>
      </section>

      <section>
        <h2 className="font-display text-3xl">Runs</h2>
        <ul className="mt-4 divide-y divide-border border border-border">
          {overview.runs.map((run) => (
            <li key={run.id}>
              <button type="button" className="flex w-full items-center justify-between px-4 py-3 text-left" onClick={() => openRun(run.id)}>
                <span>{run.name} · {run.origin} · {run.status}{run.partial ? " · partial" : ""}</span>
                <span className="text-sm text-muted-foreground">recorded {money(run.recordedCostCents)}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {detail ? <RunDetail run={detail} onChange={setDetail} /> : null}

      <PriceBook items={overview.priceBook} onSaved={load} />
    </div>
  );
}

function money(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

function PriceBook({ items, onSaved }: { items: Overview["priceBook"]; onSaved: () => Promise<void> }) {
  return (
    <section className="border border-border p-5">
      <h2 className="font-display text-3xl">Price book</h2>
      <p className="mt-2 text-sm text-muted-foreground">Planning allowances only. Empty rows say a site visit is required. Nothing here is a quote or a value-increase claim.</p>
      <div className="mt-4 flex flex-col gap-4">
        {items.map((item) => (
          <PriceRow key={item.id} item={item} onSaved={onSaved} />
        ))}
      </div>
    </section>
  );
}

function PriceRow({ item, onSaved }: { item: Overview["priceBook"][number]; onSaved: () => Promise<void> }) {
  const [low, setLow] = React.useState(item.lowCents == null ? "" : String(Math.round(item.lowCents / 100)));
  const [high, setHigh] = React.useState(item.highCents == null ? "" : String(Math.round(item.highCents / 100)));
  const [assumptions, setAssumptions] = React.useState(item.assumptions);
  const [siteVisit, setSiteVisit] = React.useState(item.siteVisitRequired || item.lowCents == null);
  return (
    <form className="grid gap-3 border border-border p-3 md:grid-cols-[10rem_1fr_1fr_1fr_auto]" onSubmit={(event) => {
      event.preventDefault();
      const lowCents = low.trim() ? Math.round(Number(low) * 100) : null;
      const highCents = high.trim() ? Math.round(Number(high) * 100) : null;
      const visit = new FormData(event.currentTarget).get("siteVisit") === "on";
      trpc.opportunities.savePrice.mutate({
        id: item.id,
        lowCents: Number.isFinite(lowCents) ? lowCents : null,
        highCents: Number.isFinite(highCents) ? highCents : null,
        assumptions,
        siteVisitRequired: visit || lowCents == null || highCents == null,
      }).then(onSaved);
    }}>
      <p className="text-sm">{item.roomType} · {item.label}</p>
      <Input aria-label={`${item.label} low dollars`} inputMode="decimal" value={low} onChange={(event) => setLow(event.target.value)} placeholder="Low $" />
      <Input aria-label={`${item.label} high dollars`} inputMode="decimal" value={high} onChange={(event) => setHigh(event.target.value)} placeholder="High $" />
      <Input aria-label={`${item.label} assumptions`} value={assumptions} onChange={(event) => setAssumptions(event.target.value)} />
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-sm">
          <input name="siteVisit" type="checkbox" checked={siteVisit} onChange={(event) => setSiteVisit(event.target.checked)} />
          Site visit
        </label>
        <Button type="submit" size="sm" variant="outline">Save</Button>
      </div>
    </form>
  );
}

function RunDetail({ run, onChange }: { run: Detail; onChange: (run: Detail) => void }) {
  const counts = run.stageCounts as Record<string, number>;
  async function refresh() {
    onChange(await trpc.opportunities.detail.query({ id: run.id }));
  }
  return (
    <section className="border border-border p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{run.origin === "demo" ? "Demo dataset" : run.origin}</p>
          <h2 className="font-display text-3xl">{run.name}</h2>
          <p className="mt-2 text-sm text-muted-foreground">Chicago dates {run.chicagoStart} to {run.chicagoEnd}. Estimated {money(run.estimatedCostCents)} · reserved {money(run.reservedCostCents)} · recorded {money(run.recordedCostCents)}.</p>
          {run.shortfallNote ? <p className="mt-2 text-sm">{run.shortfallNote}</p> : null}
          {run.error ? <p className="mt-2 text-sm">{run.error}</p> : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <a className="border border-border px-3 py-2 text-xs uppercase tracking-[0.14em]" href={`/api/admin/runs/${run.id}/report`}>PDF</a>
          <a className="border border-border px-3 py-2 text-xs uppercase tracking-[0.14em]" href={`/api/admin/runs/${run.id}/report?format=csv`}>CSV</a>
          <Button type="button" variant="outline" size="sm" onClick={() => trpc.opportunities.cancel.mutate({ id: run.id }).then(refresh)}>Cancel</Button>
          {run.status === "awaiting_review" ? <Button type="button" size="sm" onClick={() => trpc.opportunities.resume.mutate({ id: run.id, approved: true }).then(refresh)}>Resume generation</Button> : null}
        </div>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-2 text-sm md:grid-cols-4">
        {Object.entries(counts).map(([key, value]) => (
          <div key={key}><dt className="text-muted-foreground">{key}</dt><dd>{value}</dd></div>
        ))}
      </dl>
      <div className="mt-6 flex flex-col gap-6">
        {run.listings.map((listing) => (
          <article key={listing.id} className="border border-border p-4">
            <h3 className="font-display text-2xl">{listing.rank ? `${listing.rank}. ` : ""}{listing.addressLine}</h3>
            <p className="text-sm text-muted-foreground">{listing.city}, {listing.state} {listing.postalCode} · {listing.status}</p>
            <p className="mt-2 text-sm">
              {listing.exactSalePrice != null ? `Exact sale price $${listing.exactSalePrice.toLocaleString("en-US")}` : "Exact sale price unknown"}
              {listing.askingPrice != null ? ` · Asking $${listing.askingPrice.toLocaleString("en-US")}` : ""}
              {listing.priceRangeLow != null ? ` · Range $${listing.priceRangeLow.toLocaleString("en-US")}–$${listing.priceRangeHigh?.toLocaleString("en-US")}` : ""}
              {listing.estimatedValue != null ? ` · Estimate $${listing.estimatedValue.toLocaleString("en-US")} (not used as the sale price)` : ""}
            </p>
            <p className="mt-1 text-sm">Closed {listing.closedDate ?? "unverified"} · {listing.attribution}</p>
            {listing.sourceUrl ? <p className="text-sm">Reference: {listing.sourceUrl}</p> : null}
            {listing.scoreExplanation ? <p className="mt-2 text-sm">{listing.scoreExplanation}</p> : null}
            {listing.exclusionReason || listing.reviewReason ? <p className="mt-2 text-sm">{listing.exclusionReason ?? listing.reviewReason}</p> : null}
            {listing.conflicts.length ? <p className="mt-2 text-sm">Conflicting sale details were kept and flagged.</p> : null}
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {listing.photos.map((photo) => (
                <figure key={photo.id}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo.publicPath ?? `/api/admin/photos/${photo.id}`} alt={`${listing.addressLine} source photo`} className="aspect-[4/3] w-full object-cover" />
                  <figcaption className="mt-1 text-xs text-muted-foreground">Original · {photo.classification} · {photo.attribution ?? listing.attribution}</figcaption>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {listing.rooms.map((room) => (
                      <Button key={room.id} type="button" size="sm" variant="outline" onClick={() => trpc.opportunities.correctRoom.mutate({ roomId: room.id, representativePhotoId: photo.id }).then(refresh)}>
                        Use for {room.label}
                      </Button>
                    ))}
                  </div>
                </figure>
              ))}
            </div>
            {listing.rooms.map((room) => (
              <div key={room.id} className="mt-4 border-t border-border pt-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-display text-xl">{room.label}</h4>
                  <p className="text-sm">{room.decision} · outdated {room.outdatedScore ?? "—"} · confidence {room.confidence ?? "—"}</p>
                </div>
                <p className="mt-1 text-sm">{room.explanation}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <label className="text-sm">Room type
                    <select className="ml-2 bg-transparent" value={room.roomType} onChange={(event) => trpc.opportunities.correctRoom.mutate({ roomId: room.id, roomType: event.target.value as "kitchen" | "bathroom" }).then(refresh)}>
                      <option value="kitchen">Kitchen</option>
                      <option value="bathroom">Bathroom</option>
                    </select>
                  </label>
                  <Button type="button" size="sm" variant="outline" onClick={() => trpc.opportunities.correctRoom.mutate({ roomId: room.id, includeInConcepts: !room.includeInConcepts }).then(refresh)}>
                    {room.includeInConcepts ? "Remove from concepts" : "Include in concepts"}
                  </Button>
                  <Button type="button" size="sm" variant="ghost" onClick={() => trpc.opportunities.overrideListing.mutate({ listingId: listing.id, status: "excluded", reason: "Excluded by staff review." }).then(refresh)}>
                    Exclude home
                  </Button>
                </div>
                <div className="mt-3 grid gap-3 md:grid-cols-3">
                  {room.concepts.map((concept) => {
                    const summary = concept.scopeSummary as { tier?: string; retained?: string; proposed?: string; materials?: string; planningBudget?: string };
                    return (
                      <figure key={concept.id}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={`/api/admin/photos/${concept.id}`} alt={`AI renovation concept, ${summary.tier ?? concept.tier}`} className="aspect-[4/3] w-full object-cover" />
                        <figcaption className="mt-1 text-xs">AI renovation concept · {summary.tier} · {concept.checkStatus}. {summary.planningBudget}</figcaption>
                        <p className="text-xs text-muted-foreground">{summary.proposed}</p>
                        <Button type="button" size="sm" variant="outline" className="mt-2" onClick={() => trpc.opportunities.regenerate.mutate({ conceptId: concept.id }).then(refresh)}>Regenerate</Button>
                      </figure>
                    );
                  })}
                </div>
              </div>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}
