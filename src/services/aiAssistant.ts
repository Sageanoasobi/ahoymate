import { Boat, MaintenanceTask } from '../types/boat';

interface BoatKnowledgeBase {
  [key: string]: {
    models: {
      [key: string]: {
        specifications: string[];
        commonIssues: string[];
        maintenanceSchedule: {
          [key: string]: string[];
        };
      };
    };
    generalInfo: {
      commonIssues: string[];
      maintenanceSchedule: {
        [key: string]: string[];
      };
    };
  };
}

const boatKnowledgeBase: BoatKnowledgeBase = {
  'Sailboat': {
    models: {
      'Beneteau Oceanis': {
        specifications: [
          'Modern cruising sailboat',
          'Known for excellent sailing performance',
          'Spacious cockpit and interior layout'
        ],
        commonIssues: [
          'Deck hardware corrosion',
          'Keel bolt maintenance',
          'Rudder bearing wear'
        ],
        maintenanceSchedule: {
          weekly: [
            'Check rigging tension',
            'Inspect sail condition',
            'Clean deck and cockpit'
          ],
          monthly: [
            'Inspect keel bolts',
            'Check rudder bearings',
            'Service winches'
          ]
        }
      }
    },
    generalInfo: {
      commonIssues: [
        'Sail wear and tear',
        'Standing rigging tension',
        'Winch maintenance',
        'Hull integrity'
      ],
      maintenanceSchedule: {
        weekly: [
          'Check rigging tension',
          'Inspect sails for damage',
          'Monitor bilge water levels'
        ],
        monthly: [
          'Clean hull',
          'Service winches',
          'Inspect standing rigging'
        ]
      }
    }
  },
  'Motor Yacht': {
    models: {
      'Sea Ray': {
        specifications: [
          'Luxury motor yacht',
          'Advanced propulsion systems',
          'Modern electronics package'
        ],
        commonIssues: [
          'Stern drive maintenance',
          'Electrical system complexity',
          'Hull gelcoat maintenance'
        ],
        maintenanceSchedule: {
          weekly: [
            'Check engine fluids',
            'Monitor electrical systems',
            'Clean hull waterline'
          ],
          monthly: [
            'Service stern drive',
            'Check battery connections',
            'Inspect hull integrity'
          ]
        }
      }
    },
    generalInfo: {
      commonIssues: [
        'Engine maintenance',
        'Fuel system issues',
        'Electrical systems',
        'Hull integrity'
      ],
      maintenanceSchedule: {
        weekly: [
          'Check engine oil and coolant',
          'Monitor fuel levels',
          'Inspect bilge pumps'
        ],
        monthly: [
          'Change engine oil',
          'Check batteries',
          'Inspect through-hulls'
        ]
      }
    }
  }
};

export class AIAssistant {
  private boat: Boat;
  private tasks: MaintenanceTask[];
  private boatInfo: any;

  constructor(boat: Boat, tasks: MaintenanceTask[] = []) {
    this.boat = boat;
    this.tasks = tasks;
    this.boatInfo = this.getBoatInfo();
  }

  private getBoatInfo() {
    const baseType = Object.keys(boatKnowledgeBase).find(type => 
      this.boat.type.toLowerCase().includes(type.toLowerCase())
    ) || 'Motor Yacht';

    const modelInfo = Object.keys(boatKnowledgeBase[baseType].models).find(model =>
      this.boat.engineModel.toLowerCase().includes(model.toLowerCase())
    );

    return {
      type: baseType,
      modelSpecific: modelInfo ? boatKnowledgeBase[baseType].models[modelInfo] : null,
      general: boatKnowledgeBase[baseType].generalInfo
    };
  }

  private getMaintenanceStatus(): string {
    const overdueTasks = this.tasks.filter(task => 
      !task.completed && new Date(task.dueDate) < new Date()
    );
    
    const upcomingTasks = this.tasks.filter(task =>
      !task.completed && 
      new Date(task.dueDate) > new Date() &&
      new Date(task.dueDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    );

    const highPriorityTasks = this.tasks.filter(task =>
      !task.completed && task.priority === 'high'
    );

    return `
Current maintenance status:
- ${overdueTasks.length} overdue tasks
- ${upcomingTasks.length} tasks due in the next week
- ${highPriorityTasks.length} high-priority tasks pending
    `;
  }

  async getResponse(query: string): Promise<string> {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('maintenance') || lowerQuery.includes('service')) {
      return this.getMaintenanceAdvice();
    }
    
    if (lowerQuery.includes('problem') || lowerQuery.includes('issue') || lowerQuery.includes('fix')) {
      return this.getTroubleshootingAdvice();
    }
    
    if (lowerQuery.includes('schedule') || lowerQuery.includes('plan')) {
      return this.getSchedulingAdvice();
    }

    const info = this.boatInfo.modelSpecific || this.boatInfo.general;
    
    return `For your ${this.boat.length}ft ${this.boat.type} (${this.boat.yearManufactured}):

${this.getMaintenanceStatus()}

Key points for your vessel:
${info.commonIssues.map((issue: string) => `- ${issue}`).join('\n')}

Would you like specific information about:
1. Maintenance schedules
2. Common issues and troubleshooting
3. Recommended upgrades or modifications

Just let me know what interests you!`;
  }

  private getMaintenanceAdvice(): string {
    const info = this.boatInfo.modelSpecific || this.boatInfo.general;
    const schedule = info.maintenanceSchedule;
    
    return `Maintenance recommendations for your ${this.boat.length}ft ${this.boat.type}:

${this.getMaintenanceStatus()}

Weekly Tasks:
${schedule.weekly.map((task: string) => `- ${task}`).join('\n')}

Monthly Tasks:
${schedule.monthly.map((task: string) => `- ${task}`).join('\n')}

Specific to your ${this.boat.engineModel}:
- Regular oil changes every 100 hours or annually
- Inspect fuel systems quarterly
- Check belts and hoses monthly

Would you like me to help you schedule these maintenance tasks?`;
  }

  private getTroubleshootingAdvice(): string {
    const info = this.boatInfo.modelSpecific || this.boatInfo.general;
    
    return `Troubleshooting guide for your ${this.boat.type} (${this.boat.yearManufactured} model):

Common Issues to Check:
${info.commonIssues.map((issue: string) => `- ${issue}`).join('\n')}

For your ${this.boat.engineModel}:
1. Start with basic checks:
   - Fuel and oil levels
   - Unusual sounds or vibrations
   - Temperature gauges
   - Water in fuel separator

2. Age-specific considerations (${this.boat.yearManufactured}):
   - Electrical connections
   - Seals and gaskets
   - Structural integrity
   - Corrosion points

Would you like detailed guidance on any of these areas?`;
  }

  private getSchedulingAdvice(): string {
    const info = this.boatInfo.modelSpecific || this.boatInfo.general;
    
    return `Maintenance schedule for your ${this.boat.type}:

${this.getMaintenanceStatus()}

Recommended Schedule:
1. Weekly Tasks:
${info.maintenanceSchedule.weekly.map((task: string) => `   - ${task}`).join('\n')}

2. Monthly Tasks:
${info.maintenanceSchedule.monthly.map((task: string) => `   - ${task}`).join('\n')}

3. ${this.boat.engineModel} Specific:
   - Oil change: Every 100 hours or annually
   - Fuel system check: Quarterly
   - Belt inspection: Monthly

Would you like me to help you set up maintenance reminders for these tasks?`;
  }
}