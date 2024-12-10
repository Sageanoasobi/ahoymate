import { Boat, MaintenanceTask } from '../types/boat';

interface AIContext {
  boat: Boat;
  tasks: MaintenanceTask[];
  userQueries: string[];
}

export class AIService {
  private context: AIContext = {
    boat: null as unknown as Boat,
    tasks: [],
    userQueries: []
  };

  private updateContext(boat: Boat, tasks: MaintenanceTask[] = []) {
    this.context.boat = boat;
    this.context.tasks = tasks;
  }

  private addUserQuery(query: string) {
    this.context.userQueries.push(query);
  }

  private analyzeMaintenanceTasks(): string {
    if (!this.context.tasks.length) return '';

    const completedTasks = this.context.tasks.filter(task => task.completed);
    const pendingTasks = this.context.tasks.filter(task => !task.completed);
    const overdueTasks = pendingTasks.filter(task => new Date(task.dueDate) < new Date());
    
    const categories = new Set(this.context.tasks.map(task => task.category));
    const priorityDistribution = this.context.tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return `
Based on your maintenance history:
- ${completedTasks.length} completed tasks
- ${pendingTasks.length} pending tasks
- ${overdueTasks.length} overdue tasks
- Most common categories: ${Array.from(categories).join(', ')}
- Priority distribution: ${Object.entries(priorityDistribution)
  .map(([priority, count]) => `${priority}: ${count}`)
  .join(', ')}
    `.trim();
  }

  async getResponse(boat: Boat, userQuery: string, tasks: MaintenanceTask[] = []): Promise<string> {
    this.updateContext(boat, tasks);
    this.addUserQuery(userQuery);

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    const maintenanceAnalysis = this.analyzeMaintenanceTasks();
    const boatContext = `${boat.length}ft ${boat.type} (${boat.yearManufactured}) with ${boat.engineModel} engine`;

    // Generate contextual response based on query type
    if (userQuery.toLowerCase().includes('maintenance')) {
      return `
For your ${boatContext}:

${maintenanceAnalysis}

Recommended maintenance schedule:
1. Engine service every 100 hours or annually
2. Hull inspection every 6 months
3. Safety equipment checks monthly

Would you like me to help you schedule any of these tasks?`;
    }

    if (userQuery.toLowerCase().includes('problem') || userQuery.toLowerCase().includes('issue')) {
      return `
Based on your ${boatContext} and maintenance history:

${maintenanceAnalysis}

Common issues to check:
1. Engine: Check oil levels, fuel system, and cooling
2. Electrical: Inspect connections and battery health
3. Hull: Look for any damage or wear

Would you like specific troubleshooting steps for any of these areas?`;
    }

    // Default response with personalized context
    return `
I understand you're asking about "${userQuery}" for your ${boatContext}.

${maintenanceAnalysis}

I can help you with:
1. Maintenance scheduling and reminders
2. Troubleshooting common issues
3. Best practices for your specific vessel

What would you like to know more about?`;
  }
}