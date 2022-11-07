// import Vue from 'vue';
import Sodacs from '../utils/sodacs';



export default (context,inject) => {

    const func = Sodacs.connect(context.env, context);
    inject ('sodacs', func)
    
}