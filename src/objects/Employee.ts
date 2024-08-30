enum SkillType {
    WEB = "Web",
    FRAMEWORKS = "Frameworks",
    PROGRAMMING = "Programming",
    ADOBE = "Adobe",
    APPLICATIONS = "Applications",
    CORPORATE = "Corporate"
}

class Skill {
    image: string | null;
    type: SkillType;
    name: string;
    level: number;
    withFieldExperience: boolean;
    related: Skill[] = [];

    constructor(image: string | null, type: SkillType, name: string, level: number, withFieldExperience: boolean, related: Skill[] = []) {
        this.image = image;
        this.type = type;
        this.name = name;
        this.level = level;
        this.withFieldExperience = withFieldExperience;
        this.related = related;
    }

    // Web
    static html = new Skill("html.png", SkillType.WEB, "HTML", 5, true);
    static css = new Skill("css.png", SkillType.WEB, "CSS", 5, true);

    // Frameworks
    static react = new Skill("react.png", SkillType.FRAMEWORKS, "React", 3, true, [Skill.html, Skill.css]);
    static flutter = new Skill("flutter.png", SkillType.FRAMEWORKS, "Flutter", 4, false);
    static ui_kit = new Skill("ui_kit.png", SkillType.FRAMEWORKS, "UIKit", 3, false);
    static swift_ui = new Skill("swift_ui.png", SkillType.FRAMEWORKS, "Swift UI", 5, true, [Skill.ui_kit]);

    // Programming
    static python = new Skill("python.png", SkillType.PROGRAMMING, "Python", 5, true);
    static javascript = new Skill("javascript.png", SkillType.PROGRAMMING "JavaScript", 4, true);
    static typescript = new Skill("typescript.png", SkillType.PROGRAMMING "TypeScript", 4, true, [Skill.javascript]);
    static swift_5 = new Skill("swift_5.png", SkillType.PROGRAMMING, "Swift 5", 5, true);
    static java = new Skill("java.png", SkillType.PROGRAMMING, "Java", 4, false);

    // Adobe
    static photoshop = new Skill("photoshop.png", "Photoshop", 5, true);
    static illustrator = new Skill("illustrator.png", "Illustrator", 5, true);
    static premiere_pro = new Skill("premiere_pro.png", "Premiere Pro", 4, false);
    static after_effects = new Skill("after_effects.png", "After Effects", 4, false);

    // Applications
    static figma = new Skill("figma.png", "Figma", 5, true);
    static blender = new Skill("blender.png", "Blender", 4, false);

    // Corporate
    static excel = new Skill("excel.png", "Excel", 5, true);
    static job_boss_2 = new Skill("job_boss_2.png", "JobBoss2", 4, true);

}

class Employee {
    image: string;
    name: string;
    title: string;
    description: string;
    skills: Skill[] = [];

    constructor(image: string, name: string, title: string, description: string, skills: Skill[] = []) {
        this.image = image;
        this.name = name;
        this.title = title;
        this.description = description;
        this.skills = skills;
    }

    static employees: Employee[] = [
        new Employee(
            "https://via.placeholder.com/150", 
            "Spencer Steadman", 
            "Founder & Lead Developer", 
            "As a _*computer science*_ student _*at Virginia Tech*_ and a self-taught, independent _*software engineer*_ with _*6 years of experience*_, I'm deeply passionate about computing and software development that fosters creativity and productivity. Throughout these years, I've cultivated a love for learning and expressing my creativity through various mediums, including _*programming, graphic design, and front-end UI/UX design.*_ With experience across the full tech stack, I’m incredibly excited to continue developing groundbreaking technology and crafting beautiful designs with Painter*s Tape Studios. _*Let's go Hokies!*_",
            [
                Skill.react,
                Skill.flutter,

                Skill.swift_5,
                Skill.python,
                Skill.typescript,
                Skill.java,

                Skill.photoshop, 
                Skill.illustrator, 
                Skill.premiere_pro, 
                Skill.after_effects, 

                Skill.figma,
                Skill.blender,

                Skill.excel,
                Skill.job_boss_2
            ]
        ),
        new Employee(
            "https://via.placeholder.com/150", 
            "Jane Smith", 
            "CFO", 
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        ),
    ];
}

export { Employee };