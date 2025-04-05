

export const sendMessageToAPI = async (inputText: string, imagePreview: string | null): Promise<string> => {
  // Prepare API message format
  const apiMessages: any[] = [{ 
    role: "user", 
    content: [{ type: "text", text: inputText }] 
  }];

  // Add image to message if present
  if (imagePreview) {
    const base64Image = imagePreview.split(',')[1];
    apiMessages[0].content.push({
      type: "image_url",
      image_url: { url: `data:image/jpeg;base64,${base64Image}` }
    });
  }

  // Site info
  const SITE_URL = typeof window !== 'undefined' ? window.location.origin : '';
  const SITE_NAME = typeof document !== 'undefined' ? document.title : "OurRepo";

  // Add system message
  const systemMessage = {
    role: "system",
    content: [
      {
        type: "text",
        text: "You are Pizza Chat, the assistant of the Project Repository System. You should introduce yourself as 'I am Pizza Chat, the assistant of the Project Repository System.' whenever someone asks who you are. Answer all questions concisely and directly. whenever someone asks who developed you should answer 'I developed by AIU & VT Student (Ahmed, Aiden, Belal, Martha, Merna)'."
      }
    ]
  };

  apiMessages.unshift(systemMessage);
  const response = await fetch( "https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer API_KEY`,
      "HTTP-Referer": SITE_URL,
      "X-Title": SITE_NAME,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "qwen/qwen2.5-vl-72b-instruct:free",
      messages: apiMessages
    })
  });

  const data = await response.json();
  return data.choices ? data.choices[0].message.content : "Error: No response";
};

export const formatText = (text: string): string => {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/^### (.*?)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*?)$/gm, "<h2>$1</h2>")
    .replace(/^# (.*?)$/gm, "<h1>$1</h1>")
    .replace(/\n- (.*?)$/gm, "<ul><li>$1</li></ul>")
    .replace(/\n/g, "<br>");
};