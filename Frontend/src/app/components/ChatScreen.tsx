import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send, Smile, Image, Phone, Video } from "lucide-react";
import { conversations, chatMessages, Conversation } from "../data/mockData";
import { motion } from "motion/react";

interface Props {
  onBack?: () => void;
}

export function ChatScreen({ onBack }: Props) {
  const [selected, setSelected] = useState<Conversation | null>(null);

  if (selected) {
    return (
      <ChatWindow
        conversation={selected}
        onBack={() => setSelected(null)}
      />
    );
  }

  return <ConversationList conversations={conversations} onSelect={setSelected} />;
}

function ConversationList({
  conversations: convos,
  onSelect,
}: {
  conversations: Conversation[];
  onSelect: (c: Conversation) => void;
}) {
  return (
    <div className="flex flex-col h-full bg-[#08080f]">
      {/* Header */}
      <div className="px-5 pt-12 pb-4">
        <h2
          className="text-xl mb-1"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#f0f0fc" }}
        >
          Messages
        </h2>
        <p className="text-xs" style={{ color: "#7070a0", fontFamily: "var(--font-body)" }}>
          {convos.filter((c) => c.unread > 0).length} unread
        </p>
      </div>

      {/* Search */}
      <div className="px-5 mb-4">
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span style={{ color: "#505070" }}>🔍</span>
          <input
            placeholder="Search messages..."
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: "#f0f0fc", fontFamily: "var(--font-body)" }}
          />
        </div>
      </div>

      {/* Active now */}
      <div className="px-5 mb-4">
        <p className="text-xs mb-3" style={{ color: "#7070a0", fontFamily: "var(--font-body)" }}>
          ACTIVE NOW
        </p>
        <div className="flex gap-4 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {convos
            .filter((c) => c.online)
            .map((c) => (
              <button
                key={c.id}
                onClick={() => onSelect(c)}
                className="flex flex-col items-center gap-1.5 flex-shrink-0"
              >
                <div className="relative">
                  <div
                    className="w-12 h-12 rounded-2xl p-0.5"
                    style={{ background: "linear-gradient(135deg, #a855f7, #3b82f6)" }}
                  >
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-full h-full rounded-[14px] object-cover"
                    />
                  </div>
                  <div
                    className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full"
                    style={{ background: "#22c55e", border: "2px solid #08080f" }}
                  />
                </div>
                <span className="text-xs" style={{ color: "#9090b8", fontFamily: "var(--font-body)" }}>
                  {c.name.split(" ")[0]}
                </span>
              </button>
            ))}
        </div>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto px-5 pb-24 space-y-1" style={{ scrollbarWidth: "none" }}>
        {convos.map((convo, i) => (
          <motion.button
            key={convo.id}
            className="w-full flex items-center gap-3 px-3 py-3.5 rounded-2xl transition-all text-left"
            onClick={() => onSelect(convo)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            style={{
              background: convo.unread > 0 ? "rgba(168,85,247,0.06)" : "transparent",
            }}
          >
            <div className="relative flex-shrink-0">
              <div
                className="w-12 h-12 rounded-2xl overflow-hidden"
                style={{ border: convo.unread > 0 ? "2px solid rgba(168,85,247,0.4)" : "2px solid transparent" }}
              >
                <img
                  src={convo.avatar}
                  alt={convo.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {convo.online && (
                <div
                  className="absolute bottom-0 right-0 w-3 h-3 rounded-full"
                  style={{ background: "#22c55e", border: "2px solid #08080f" }}
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span
                  className="text-sm"
                  style={{
                    color: convo.unread > 0 ? "#f0f0fc" : "#c0c0d8",
                    fontFamily: "var(--font-display)",
                    fontWeight: convo.unread > 0 ? 600 : 400,
                  }}
                >
                  {convo.name}
                </span>
                <span className="text-xs" style={{ color: "#505070", fontFamily: "var(--font-body)" }}>
                  {convo.time}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span
                  className="text-xs truncate"
                  style={{
                    color: convo.unread > 0 ? "#a0a0c0" : "#606080",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {convo.lastMessage}
                </span>
                {convo.unread > 0 && (
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs ml-2 flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #a855f7, #3b82f6)",
                      color: "#ffffff",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {convo.unread}
                  </span>
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function ChatWindow({ conversation, onBack }: { conversation: Conversation; onBack: () => void }) {
  const [messages, setMessages] = useState(chatMessages[conversation.id] || []);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: `new-${Date.now()}`, senderId: "me", text: input.trim(), time: "now" },
    ]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full bg-[#08080f]">
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 pt-12 pb-3 border-b"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}
      >
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <ArrowLeft size={16} color="#f0f0fc" />
        </button>
        <div className="relative">
          <img
            src={conversation.avatar}
            alt={conversation.name}
            className="w-9 h-9 rounded-xl object-cover"
          />
          {conversation.online && (
            <div
              className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full"
              style={{ background: "#22c55e", border: "2px solid #08080f" }}
            />
          )}
        </div>
        <div className="flex-1">
          <p
            className="text-sm leading-none mb-0.5"
            style={{ color: "#f0f0fc", fontFamily: "var(--font-display)", fontWeight: 600 }}
          >
            {conversation.name}
          </p>
          <p className="text-xs" style={{ color: conversation.online ? "#22c55e" : "#606080", fontFamily: "var(--font-body)" }}>
            {conversation.online ? "Active now" : "Offline"}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className="w-9 h-9 rounded-xl flex items-center justify-center opacity-60"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <Phone size={15} color="#f0f0fc" />
          </button>
          <button
            className="w-9 h-9 rounded-xl flex items-center justify-center opacity-60"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <Video size={15} color="#f0f0fc" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
        style={{ scrollbarWidth: "none" }}
      >
        {messages.map((msg) => {
          const isMe = msg.senderId === "me";
          return (
            <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              {!isMe && (
                <img
                  src={conversation.avatar}
                  alt=""
                  className="w-7 h-7 rounded-xl object-cover mr-2 mt-auto flex-shrink-0"
                />
              )}
              <div className="max-w-[72%]">
                <div
                  className="px-4 py-2.5 rounded-2xl text-sm"
                  style={{
                    background: isMe
                      ? "linear-gradient(135deg, #a855f7, #7c3aed)"
                      : "#161628",
                    color: isMe ? "#ffffff" : "#e0e0f0",
                    fontFamily: "var(--font-body)",
                    borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  }}
                >
                  {msg.text}
                </div>
                <p
                  className="text-xs mt-1 px-1"
                  style={{
                    color: "#404060",
                    fontFamily: "var(--font-body)",
                    textAlign: isMe ? "right" : "left",
                  }}
                >
                  {msg.time}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        className="px-4 py-3 pb-8 flex items-center gap-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <button className="opacity-40 hover:opacity-60 transition-opacity">
          <Image size={20} color="#f0f0fc" />
        </button>
        <div
          className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-2xl"
          style={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Message..."
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: "#f0f0fc", fontFamily: "var(--font-body)" }}
          />
          <button className="opacity-40 hover:opacity-60 transition-opacity">
            <Smile size={16} color="#f0f0fc" />
          </button>
        </div>
        <button
          onClick={send}
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-90"
          style={{
            background: input.trim()
              ? "linear-gradient(135deg, #a855f7, #3b82f6)"
              : "rgba(255,255,255,0.06)",
          }}
        >
          <Send size={16} color={input.trim() ? "#ffffff" : "#505070"} />
        </button>
      </div>
    </div>
  );
}
