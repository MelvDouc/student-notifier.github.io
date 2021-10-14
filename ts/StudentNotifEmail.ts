class StudentNotifEmail {
  private group: StudentGroup;

  constructor(group: StudentGroup) {
    this.group = group;
  }

  getTemplateBody(): string {
    const html = this.getHTMLBody();
    const startIndex = html.search("<body"),
      endIndex = html.search("</body>");
    return html.substring(startIndex, endIndex);
  }

  getAltBody(): string {
    const brRegex = /\<br(\s\/)?\>/g;
    const tagRegex = /\<(\w+(-\w+)*(\s+\w+(-\w+)*(\=('|").*('|"))*)*|\/\w+(-\w+)*)\>/g;

    return this.getTemplateBody()
      .replace(brRegex, "\n")
      .replace(tagRegex, "");
  }

  getHTMLBody(): string {
    const template = HtmlService.createTemplateFromFile("email-template");
    template.group = this.group;
    return template.evaluate().getContent();
  }
}