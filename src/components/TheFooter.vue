<template>
    <div id="footer-wp">
        <div id="foot-body" class="container">
            <div class="wp-inner clearfix">
                <div class="block" id="info-company">
                    <div class="title">
                        <img src="/src/assets/images/logo.png" alt="">
                    </div>
                    <p class="desc">Hava E-guide sẽ cung cấp cho bạn thông tin về các trường học trên toàn quốc. Giúp bạn có
                        cái nhìn tổng quan để đưa ra lựa trọn trọn học tập trong tương lai.</p>
                    <div id="payment">
                        <div class="thumb">
                            <img src="" alt="">
                        </div>
                    </div>
                </div>
                <div class="block menu-ft" id="info-shop">
                    <h3 class="title">Thông tin cửa hàng</h3>
                    <ul class="list-item">
                        <li>
                            <p>Nguyên Xá, Minh Khai, Bắc Từ Liêm, Hà Nội</p>
                        </li>
                        <li>
                            <p>0911634683 - 0563092451</p>
                        </li>
                        <li>
                            <p>hieukhac6869@gmail.com</p>
                        </li>
                    </ul>
                </div>
                <div class="block menu-ft policy" id="info-shop">
                    <h3 class="title">Chính sách mua hàng</h3>
                    <ul class="list-item">
                        <li>
                            <a href="" title="">Quy định - chính sách</a>
                        </li>
                        <li>
                            <a href="" title="">Chính sách bảo hành - đổi trả</a>
                        </li>
                        <li>
                            <a href="" title="">Chính sách hội viện</a>
                        </li>
                        <li>
                            <a href="" title="">Giao hàng - lắp đặt</a>
                        </li>
                    </ul>
                </div>
                <div class="block" id="newfeed">
                    <h3 class="title">Bảng tin</h3>
                    <p class="desc">Đăng ký với chung tôi để nhận được thông tin ưu đãi sớm nhất</p>
                    <div id="form-reg">
                        <form method="POST" action="">
                            <input type="email" name="email" id="email" placeholder="Nhập email tại đây">
                            <button type="submit" id="sm-reg">Đăng ký</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div id="foot-bot">
            <div class="wp-inner">
                <p id="copyright">© Bản quyền thuộc về HAVA E-GUIDE | Nguyễn Khắc Hiếu</p>
            </div>
        </div>
        <div class="chatbot" :v-html="text">
            <!--Theme switch-->
            <div style="position: fixed;" :style="darkTheme && 'color: #fff'" @click="darkTheme = !darkTheme">
                {{ darkTheme ? 'Dark' : 'Light' }} Style
            </div>

            <Chat :onSend="handleSendEvent" :chat="data" :bgColorHeader="darkTheme && '#1e1e1e'"
                :bgColorChat="darkTheme && '#2C2D2E'" :bgColorInput="darkTheme && '#1e1e1e'"
                :bgColorIcon="darkTheme && '#9B51E0'" :bgColorMessageChatbot="darkTheme && '#1e1e1e'"
                :bgColorMessagePerson="darkTheme && '#9B51E0'" :bgColorMessageTimestamp="darkTheme && '#1e1e1e'"
                :textColorInput="darkTheme && '#fff'" :textColorHeader="darkTheme && '#fff'"
                :textColorMessageChatbot="darkTheme && '#fff'" :textColorMessageTimestamp="darkTheme && '#fff'" />

        </div>
    </div>
    <!-- <div id="btn-top"><img src="public/images/icon-to-top.png" alt="" /></div>
    <div id="fb-root"></div> -->
</template>

<script setup>
import { ref } from 'vue'
import { Chat } from '@chat-ui/vue3'
const data = ref([
    { message: 'Chào bạn! Hava có thể giúp gì cho bạn?', type: 'chatbot', timestamp: formatAMPM(new Date()) }
])
const darkTheme = ref(false)

function handleSendEvent(input) {
    if (input == '') return;
    const messagePerson = {
        type: 'person',
        timestamp: formatAMPM(new Date()),
        message: input
    }
    data.value.push(messagePerson)

    setTimeout(async () => {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: input }]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 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`
            }
        });
        const messageChatbot = {
            type: 'chatbot',
            timestamp: formatAMPM(new Date()),
            message: response.data.choices[0].message.content
        }
        data.value.push(messageChatbot)
        const div = document.querySelector('.div-4');
        div.innerHTML += response.data.choices[0].message.content
    }, 200)
}

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
var text = "1. Đại học Công nghệ - Đại học Quốc gia Hà Nội 2. Đại học FPT 3. Đại học Bách khoa Hà Nội 4. Học viện Công nghệ Bưu chính Viễn thông 5. Học viện Kỹ thuật Quân sự 6. Trường đại học Công nghệ thông tin Học viện Kỹ thuật Mật mã";
text = formatOutput(text);
data.value.push({
    type: 'chatbot',
    timestamp: formatAMPM(new Date()),
    message: text
});


function formatOutput(text) {
    var items = text.split(/[\d+\.]+\s+/).filter(Boolean);
    for (let i = 0; i < items.length; i++) {
        items[i] = i + 1 + ". " + items[i];
    }
    return "<p>" + items.join('<br>') + "</p>";;
}
</script>
