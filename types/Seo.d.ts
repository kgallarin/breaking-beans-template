import {MaybeRef} from "vue";

export interface SeoPageOption {
    title?: MaybeRef<string>;
    description?: MaybeRef<string>;
    ogImage?: MaybeRef<string>;
    noIndex?: boolean;
}