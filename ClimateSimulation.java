class ClimateVariable { 
    private double real;       // measurable value (e.g., average temperature) 
    private double imaginary;  // anomaly or uncertainty factor 
    public ClimateVariable() { 
        this.real = 0.0; 
        this.imaginary = 0.0; 
    } 
    public ClimateVariable(double real) { 
        this.real = real; 
        this.imaginary = 0.0; 
    } 
    public ClimateVariable(double real, double imaginary) { 
        this.real = real; 
        this.imaginary = imaginary; 
    } 
    public ClimateVariable(ClimateVariable other) { 
        this.real = other.real; 
        this.imaginary = other.imaginary; 
    } 
    public void display() { 
        System.out.printf("Climate Variable = %.2f + %.2fi%n", real, imaginary); 
    } 
    public ClimateVariable add(ClimateVariable other) { 
        return new ClimateVariable(this.real + other.real, this.imaginary + other.imaginary); 
    } 
    public ClimateVariable subtract(ClimateVariable other) { 
        return new ClimateVariable(this.real - other.real, this.imaginary - other.imaginary); 
    } 
} 
public class ClimateSimulation { 
    public static void main(String[] args) { 
        System.out.println("=== Climate Simulation System (Complex Number Model) ===\n"); 
        ClimateVariable cv1 = new ClimateVariable(); 
        System.out.print("Default Climate Variable: "); 
        cv1.display(); 
        ClimateVariable cv2 = new ClimateVariable(25.5); // 25.5°C average temp 
        System.out.print("Real-only Climate Variable: "); 
        cv2.display(); 
        ClimateVariable cv3 = new ClimateVariable(25.5, 2.3); // uncertainty of 2.3 
        System.out.print("Full Climate Variable: "); 
        cv3.display(); 
        ClimateVariable cv4 = new ClimateVariable(cv3); 
        System.out.print("Copied Climate Variable (for simulation): "); 
        cv4.display(); 
        ClimateVariable cvSum = cv2.add(cv3); 
        System.out.print("\nCombined (cv2 + cv3): "); 
        cvSum.display(); 
        ClimateVariable cvDiff = cv3.subtract(cv2); 
        System.out.print("Difference (cv3 - cv2): "); 
        cvDiff.display(); 
    } 
} 