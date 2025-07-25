import { createApp } from "vue";
import App from "./App.vue";
import 'vuetify/styles'; // VuetifyのCSSをインポート
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Vuetifyインスタンスを作成
const vuetify = createVuetify({
    components,
    directives,
    theme: { defaultTheme: 'light' }, // テーマ設定（任意）
});

createApp(App)
    .use(vuetify)   // VueアプリにVuetifyを登録
    .mount("#app");
