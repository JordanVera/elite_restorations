import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { customerListParams, listHref, quoteListParams } from "./list-params";

describe("list params", () => {
  it("falls back to defaults for unknown or malformed values", () => {
    assert.deepEqual(customerListParams({ sort: "drop table", page: "-3" }), { q: "", sort: "name", page: 1 });
    assert.deepEqual(customerListParams({ q: ["  tile  ", "x"], sort: "quotes", page: "2" }), { q: "tile", sort: "quotes", page: 2 });
  });

  it("only allows known quote statuses and hides the total sort from staff", () => {
    const statuses = ["approved", "draft"];
    assert.equal(quoteListParams({ status: "approved" }, statuses, true).status, "approved");
    assert.equal(quoteListParams({ status: "anything" }, statuses, true).status, "");
    assert.equal(quoteListParams({ sort: "total" }, statuses, true).sort, "total");
    assert.equal(quoteListParams({ sort: "total" }, statuses, false).sort, "newest");
    assert.equal(quoteListParams({ portal: "published" }, statuses, false).portal, "published");
  });

  it("builds list URLs that drop empty values and page 1", () => {
    assert.equal(listHref("/admin/quotes", { q: "", status: "draft" }, { page: 1 }), "/admin/quotes?status=draft");
    assert.equal(listHref("/admin/quotes", { q: "a b" }, { page: 3 }), "/admin/quotes?q=a+b&page=3");
    assert.equal(listHref("/admin/quotes", { q: "x", page: 4 }, { q: null }), "/admin/quotes");
  });
});
