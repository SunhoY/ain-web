import {expect} from 'chai';

export function examineAPIHeadersAndCORS(headers, mode) {
    expect(headers['X-Api-Key']).to.equal("o5F4feDYQHUzmkpQcOdH7cE7Gv3TpJ7606S8uLs1");
    expect(headers['Content-Type']).to.equal("application/json");

    expect(mode).to.equal("cors");
}