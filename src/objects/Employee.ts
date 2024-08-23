
class Employee {
    image: string;
    name: string;
    title: string;
    description: string;

    constructor(image: string, name: string, title: string, description: string) {
        this.image = image;
        this.name = name;
        this.title = title;
        this.description = description;
    }

    static employees: Employee[] = [
        new Employee(
            "https://via.placeholder.com/150", 
            "John Doe", 
            "CEO", 
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        ),
        new Employee(
            "https://via.placeholder.com/150", 
            "Jane Smith", 
            "CFO", 
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        ),
        new Employee(
            "https://via.placeholder.com/150", 
            "Jane Smith", 
            "CFO", 
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        ),
        new Employee(
            "https://via.placeholder.com/150", 
            "Jane Smith", 
            "CFO", 
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        ),
        new Employee(
            "https://via.placeholder.com/150", 
            "Jane Smith", 
            "CFO", 
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
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