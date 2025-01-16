export class InMutableHash {
  public id: string = "";
  constructor(container: string = "") {
    if (container != "") {
      const url = window.location.href;
      const base64Hash = btoa(unescape(encodeURIComponent(`${url}/${container}`)));
      const alphanumericHash = base64Hash.replace(/[^a-zA-Z0-9]/g, "");
      this.id = alphanumericHash;
    }
  }
}
