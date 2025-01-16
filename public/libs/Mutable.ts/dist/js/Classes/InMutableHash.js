export class InMutableHash {
    constructor(container = "") {
        this.id = "";
        if (container != "") {
            const url = window.location.href;
            const base64Hash = btoa(unescape(encodeURIComponent(`${url}/${container}`)));
            const alphanumericHash = base64Hash.replace(/[^a-zA-Z0-9]/g, "");
            this.id = alphanumericHash;
        }
    }
}
