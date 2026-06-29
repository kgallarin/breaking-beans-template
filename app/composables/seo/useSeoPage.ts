import type {SeoPageOption} from "~~/types/Seo";

export function useSeoPage(options: SeoPageOption) {
    const title = toRef(options.title);
    const description = toRef(options.description);
    const ogImage = toRef(options.ogImage ?? '/og-default.png');

    useSeoMeta({
      title,
      description,
      ogTitle: title,
      ogDescription: description,
      ogImage,
      robots: options.noIndex ? 'noindex, nofollow' : 'index, follow',
    });

    const config = useRuntimeConfig();
    const route = useRoute();

    useHead({
        link: [
            {
                rel: 'canonical',
                href: computed((): string => `${config.public.appUrl}${route.path}`),
            }
        ]
    });
}