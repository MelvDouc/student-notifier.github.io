class StudentNotifEmail {
  private group: StudentGroup;

  constructor(group: StudentGroup) {
    this.group = group;
  }

  getAltBody(): string {
    return `Bonsoir,

    Il y aura cours ce ${this.group.dateInFrench} ${this.group.year} de ${this.group.startHour} à ${this.group.endHour} au club de Thionville.
    
    Cordialement,
    Melvin DOUCET`;
  }

  getHTMLBody(): string {
    const template = HtmlService.createTemplateFromFile("email-template");
    template.group = this.group;
    return template.evaluate().getContent();
  }
}