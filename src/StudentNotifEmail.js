class StudentNotifEmail {
    constructor(group) {
        this.group = group;
    }
    getAltBody() {
        return `Bonsoir,

    Il y aura cours ce ${this.group.dateInFrench} ${this.group.year} de ${this.group.startHour} à ${this.group.endHour} au club de Thionville.
    
    Cordialement,
    Melvin DOUCET`;
    }
    getHTMLBody() {
        const template = HtmlService.createTemplateFromFile("email-template");
        template.group = this.group;
        return template.evaluate().getContent();
    }
}
