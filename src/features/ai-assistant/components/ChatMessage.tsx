import { ChatBubbleLeftIcon, UserCircleIcon } from '@heroicons/react/24/outline';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-lg p-4 ${
          message.isUser
            ? 'bg-blue-600 text-white'
            : 'bg-white shadow-sm border border-gray-100'
        }`}
      >
        {!message.isUser && (
          <div className="flex items-center mb-2">
            <ChatBubbleLeftIcon className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-600">AI Assistant</span>
          </div>
        )}
        {message.isUser && (
          <div className="flex items-center mb-2 justify-end">
            <span className="text-sm font-medium text-white">You</span>
            <UserCircleIcon className="h-5 w-5 text-white ml-2" />
          </div>
        )}
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}