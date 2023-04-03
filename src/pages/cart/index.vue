<template>
    <div id="main-content" class="product-page">
        <div class="container">
            <div class="wp-inner">
                <div class="secion" id="breadcrumb">
                    <div class="secion-detail">
                        <ul class="list-item clearfix">
                            <li>
                                <a href="" title="">Trang chủ</a>
                            </li>
                            <li>>></li>
                            <li>
                                <a href="" title="">Điện thoại</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="secion" id="filter-product">
                    <div class="secion-detail">
                        <form action="">
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <input type="text" name="input" id="input" v-model="inputValue">
    <div>
    <button @click="getResponse">Send Chat Request</button>
    <div v-if="messageContent">{{ messageContent }}</div>
  </div>
</template>

<script>
export default {
    data() {
        return {
        inputValue: '',
        messageContent: ''
        }
    },
    methods: {
    async getResponse() {
      try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: this.inputValue }]
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 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`
          }
        });
        this.messageContent = response.data.choices[0].message.content;
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>