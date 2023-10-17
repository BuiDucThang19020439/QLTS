/* eslint-disable no-unused-vars */
import { createApp } from "vue";
import App from "./App.vue";

import MButton from "./components/MButton.vue";
import MTable from "./components/MTable.vue";
import MForm from "./components/MForm.vue";
import MWarning from "./components/MWarning.vue";
import MToast from "./components/MToast.vue";
import MIcon from "./components/MIcon.vue"
import Enum from "./helper/enum.js";
import Resource from "./helper/resource.js"
import MCombobox from "./components/MCombobox.vue"

// import router from './js/router'

const app = createApp(App);
// app.use(router);
app.component("m-button", MButton);
app.component("m-table", MTable);
app.component("m-form", MForm);
app.component("m-warning", MWarning);
app.component("m-toast", MToast);
app.component("m-icon", MIcon);
app.component("m-combobox", MCombobox)
app.config.globalProperties.$enum = Enum;
app.config.globalProperties.$resource = Resource;
app.mount("#app");
