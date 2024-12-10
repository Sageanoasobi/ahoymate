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
    <div
      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] rounded-lg p-4 ${
          message.isUser
            ? 'bg-blue-600 text-white'
            : 'bg-white shadow-sm border border-gray-100'
        }`}
      >
        {!message.isUser && (
          <div className="flex items-center mb-2">
            <span className="text-sm font-medium text-blue-600">Ahoy Mate AI</span>
          </div>
        )}
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}