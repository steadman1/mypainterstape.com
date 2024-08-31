import { Skill, SkillType } from "./Skill";

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

    public filterType(skillType: SkillType) {
        return this.skills.filter((skill: Skill) => skill.type === skillType);
    }

    static employees: Employee[] = [
        new Employee(
            "https://via.placeholder.com/150", 
            "Spencer Steadman", 
            "Founder & Lead Developer", 
            "As a _*computer science*_ student _*at Virginia Tech*_ and a self-taught, independent _*software engineer*_, I'm deeply passionate about computing and software development that fosters creativity and productivity. Throughout these years, I've cultivated a love for learning and expressing my creativity through various mediums, including _*programming, graphic design, and front-end UI/UX design.*_ With experience across the full tech stack, I’m incredibly excited to continue developing groundbreaking technology and crafting beautiful designs with Painter*s Tape Studios. _*Let's go Hokies!*_",
            [
                Skill.react.clone().complete(4, new Date(2022, 0, 1), true),
                Skill.flutter.clone().complete(3, new Date(2021, 0, 1), false),

                Skill.swift_5.clone().complete(5, new Date(2020, 0, 1), true),
                Skill.typescript.clone().complete(4, new Date(2021, 0, 1), true),
                Skill.python.clone().complete(5, new Date(2019, 0, 1), true),
                Skill.java.clone().complete(4, new Date(2022, 0, 1), false),

                Skill.photoshop.clone().complete(5, new Date(2016, 0, 1), true),
                Skill.illustrator.clone().complete(5, new Date(2022, 0, 1), true),
                Skill.premiere_pro.clone().complete(5, new Date(2016, 0, 1), true),
                Skill.after_effects.clone().complete(4, new Date(2022, 0, 1), true),

                Skill.figma.clone().complete(5, new Date(2020, 0, 1), true),
                Skill.blender.clone().complete(4, new Date(2020, 0, 1), false),

                Skill.excel.clone().complete(4, new Date(2019, 0, 1), true),
                Skill.job_boss_2.clone().complete(3, new Date(2023, 0, 1), true),
            ]
        ),

        new Employee(
            "https://via.placeholder.com/150", 
            "Ryan Pham", 
            "Junior Developer", 
            "blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah",
            [
                Skill.python.clone().complete(5, new Date(2023, 0, 1), true),
                Skill.java.clone().complete(4, new Date(2022, 0, 1), false),

                Skill.photoshop.clone().complete(5, new Date(2016, 0, 1), true),
                Skill.premiere_pro.clone().complete(5, new Date(2016, 0, 1), true),

                Skill.excel.clone().complete(4, new Date(2019, 0, 1), true)
            ]
        ),

        new Employee(
            "https://via.placeholder.com/150", 
            "Katie Ullmann", 
            "Something", 
            "blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah",
            [
                Skill.python.clone().complete(5, new Date(2023, 0, 1), true),
                
                Skill.photoshop.clone().complete(5, new Date(2016, 0, 1), true),

                Skill.excel.clone().complete(4, new Date(2019, 0, 1), true)
            ]
        ),
    ];
}

export default Employee;