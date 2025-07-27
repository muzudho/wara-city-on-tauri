declare module 'vue-draggable-resizable' {
    import { DefineComponent } from 'vue';
    const VueDraggableResizable: DefineComponent<{
        w?: number | string;
        h?: number | string;
        x?: number;
        y?: number;
        draggable?: boolean;
        resizable?: boolean;
        parent?: boolean;
        className?: string;
        // 必要に応じて他のPropsを追加
    }>;
    export default VueDraggableResizable;
}