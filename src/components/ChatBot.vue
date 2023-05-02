<template>
    <div class="chatbot">
        <div class="chatbot_icon" @click="toggleChatbot">
            <i class="fas fa-comment"></i>
        </div>
        <div class="chatbot_inner" :class="{ visible: showChatContent }">
            <div class="chat_header">
                <div class="chat_header_icon">
                    <i class="fas fa-comment"></i>
                </div>
                <div class="chat_header_info">Tư vấn trực tuyến</div>
                <div class="close" @click="closeChatbot">
                    <i class="fas fa-times"></i>
                </div>
            </div>
            <div class="chat_content" id="chat_content">
                <div v-for="message in messages" :class="message.role">
                    <div class="message">
                        <p v-html="message.content"></p>
                    </div>
                </div>
            </div>
            <div class="message-input">
                <input type="text" placeholder="Type your message here" @keyup.enter="sendMessage" v-model="newMessage" />
                <div class="btn_send" @click="sendMessage">
                    <i class="fas fa-paper-plane"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ChatBot',
    data() {
        return {
            showChatContent: false,
            messages: [],
            newMessage: '',
        };
    },
    created() {
        this.messages = JSON.parse(localStorage.getItem('conversation')) || [];
    },
    methods: {
        toggleChatbot() {
            this.showChatContent = !this.showChatContent;
            document.querySelector('.chatbot_icon').classList.add('clicked');
            document.querySelector('.chatbot_inner').style.transform =
                'translateY(-730px)';
            scrollBottom();
        },
        closeChatbot() {
            this.showChatContent = !this.showChatContent;
            document.querySelector('.chatbot_inner').style.transform =
                'translateY(730px)';
            document.querySelector('.chatbot_icon').classList.remove('clicked');
        },
        sendMessage() {
            if (this.newMessage.trim() !== '') {
                const newMsg = {
                    role: 'user',
                    content: this.newMessage,
                };
                this.messages.push(newMsg);
                scrollBottom();
                this.newMessage = '';
                axios.post('https://api.openai.com/v1/chat/completions', {
                    model: 'gpt-3.5-turbo',
                    messages: this.messages.slice(this.messages.length - 5)
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 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'
                    }
                })
                    .then(response => {
                        const messageChatbot = {
                            role: 'system',
                            content: formatOutput(response.data.choices[0].message.content)
                        };
                        this.messages.push(messageChatbot);
                        localStorage.setItem('conversation', JSON.stringify(this.messages));
                        scrollBottom();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
    },
};
function formatOutput(text) {

    text = text.replace("OpenAI", "Hava dựa trên API của ChatGPT");
    var items = text.split("\n");
    return "<p>" + items.join('<br>') + "</p>";;
}
function scrollBottom() {
    setTimeout(() => {
        const chatContent = document.getElementById("chat_content");
        chatContent.scrollTop = chatContent.scrollHeight;
    }, 10);
}
</script>
  
<style>
.chatbot_icon {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 30px;
    right: 30px;
    font-size: 30px;
    color: #fff;
    width: 75px;
    height: 75px;
    border-radius: 50%;
    background-color: rgb(28, 62, 255);
    transition: 0.5s;
}

.chatbot_icon.clicked {
    transform: translateY(60px);
    opacity: 0;
    transition: 0.5s;
}

.chatbot_inner {
    position: fixed;
    z-index: 1000;
    bottom: -700px;
    right: 30px;
    width: 450px;
    height: 700px;
    transition: 0.8s;
    background-color: rgb(235, 245, 245);
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
}

.chat_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    background-color: #fff;
    color: #222;
    padding: 0 10px;
    font-weight: bold;
}

.chat_header_icon {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    color: #fff;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: rgb(28, 62, 255);
}

.chat_header_title {
    font-size: 25px;
    font-weight: 600;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.close {
    font-size: 30px;
    padding: 10px;
    cursor: pointer;
}

.chat_content {
    padding: 20px;
    box-sizing: border-box;
    height: 565px;
    overflow-y: auto;
    scroll-behavior: smooth;
    scroll-snap-type: y mandatory;
}

.chat_content::-webkit-scrollbar {
    display: none;
}

.chat_content .system {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
}

.chat_content .system .message {
    max-width: 80%;
    float: left;
    padding: 15px;
    background: #fff;
    border-radius: 10px;
    text-align: left;
}

.chat_content .user {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
}

.chat_content .user .message {
    max-width: 60%;
    padding: 10px;
    background: rgb(28, 62, 255);
    border-radius: 15px;
    text-align: left;
    color: #fff;
}

.message-input {
    position: relative;
}

.message-input input[type='text'] {
    width: 100%;
    border: none;
    outline: none;
    font-size: 16px;
    padding: 15px;
    padding-right: 55px;
    box-sizing: border-box;
}

.message-input .btn_send {
    position: absolute;
    font-size: 22px;
    top: 0px;
    right: 0px;
    color: #444;
    padding: 10px 20px;
    cursor: pointer;
}

.scroll-bottom {
    position: absolute;
    bottom: 100px;
    right: 5px
}

.visible .chatbot_icon {
    opacity: 0;
    pointer-events: none;
}

@media (max-width: 576px) {
    .chatbot_inner {
        right: 0px;
        bottom: -730px;
        width: 355px;
    }
}
</style>
  