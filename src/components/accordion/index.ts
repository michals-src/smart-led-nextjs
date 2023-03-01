import Accordion from "./accordion";
import {AccordionItem} from "./accordion-item";
import {AccordionItemHeader} from "./accordion-header";
import {AccordionItemCollapse} from "./accordion-collapse";


export default Object.assign(Accordion, {
    Item: AccordionItem,
    ItemHeader: AccordionItemHeader,
    ItemCollapse: AccordionItemCollapse
})