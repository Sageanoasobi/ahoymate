import { Observable } from '@nativescript/core';
import { AIAssistantService } from '../../shared/services/ai-assistant.service';
import { BoatService } from '../../shared/services/boat.service';

interface ChatMessage {
    message: string;
    isUser: boolean;
}

export class AssistantViewModel extends Observable {
    private aiService: AIAssistantService;
    private boatService: BoatService;
    
    conversation: ChatMessage[] = [];
    userInput: string = '';

    constructor() {
        super();
        this.aiService = new AIAssistantService();
        this.boatService = new BoatService();
        
        // Initial greeting
        this.conversation = [{
            message: "Hello! I'm your BoatMate AI assistant. How can I help you today?",
            isUser: false
        }];
    }

    async onSendMessage() {
        if (!this.userInput.trim()) return;

        const userMessage = this.userInput;
        this.conversation.push({
            message: userMessage,
            isUser: true
        });

        const boat = this.boatService.getCurrentBoat();
        if (boat) {
            const response = await this.aiService.getMaintenanceAdvice(boat, userMessage);
            this.conversation.push({
                message: response,
                isUser: false
            });
        }

        this.userInput = '';
        this.notifyPropertyChange('conversation', this.conversation);
        this.notifyPropertyChange('userInput', this.userInput);
    }
}