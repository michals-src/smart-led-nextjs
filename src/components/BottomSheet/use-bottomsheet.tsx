import React, { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BottomsheetContext } from './bottomsheet-context';
import { BottomsheetThemeContext } from './bottomsheet-context';

export const useBottomsheet = function (children: React.ReactNode) {
    const [viewID, setViewID] = React.useState(-1);
    const [prevViewID, setPrevViewID] = React.useState(-1);

    const childrenArr: any = React.useCallback(
        function () {
            if (children === null) return [];
            const toArr = !Array.isArray(children) || children.length <= 0 ? [children] : children;
            return toArr.map((child, idx) => {
                if (!React.isValidElement(child)) return;
                return child;
            })
        },
        [children]
    );

    React.useEffect(() => {
        return function () {
            setViewID(-1);
            setPrevViewID(-1);
        }
    }, []);

    React.useEffect(() => {
        childrenArr().map((child: React.ReactNode, index: number) => {
            if (!React.isValidElement(child)) return;

            const item: React.ReactElement = React.cloneElement(child, {});
            const route = item.props.root ? 'root' : item.props.as;

            screens[route] = item;
            setSheets((state: any) => {
                return { ...state, [`${route}`]: item };
            });
        });

        return function () {
            setSheets({});
            //screens = {};
        };
    }, [childrenArr]);

    // const ContentItem = React.isValidElement(sheets[sheetID]) ? React.cloneElement(sheets[sheetID]) : null;

    const back = function () {
        navigate(prevSheetID);
    };

    const navigate = function (to: string, transferprops: object = {}) {
        if (Object.keys(sheets).indexOf(to) < 0) {
            throw Error('Bottm sheet [navigation]');
        }

        /**
         * transferprops
         * Dodatkowe własności przekazywane przez element navigate
         */
        if (Object.keys(transferprops).length > 0) {
            const sheet = sheets[to];
            const screenWithTransferProps = React.cloneElement({ ...sheet }, Object.assign({}, { transferprops }));

            setSheets((state: any) => {
                return {
                    ...state,
                    [`${to}`]: screenWithTransferProps,
                };
            });
        }

        //screens = { ...screens, [`${to}`]: screenWithTransferProps };
        //console.log(sheetID);
        //setPrevSheetID(sheetID);
        setSheetID((state) => {
            setPrevSheetID(state);
            return to;
        });
    };

    const close = function () {
        setSheetID('root');
        onClose?.();
    };

    const ctxValue = React.useMemo(
        () => ({
            close,
            navigate,
            back,
        }),
        [sheets]
    );

    const getContentItem = childrenArr().map((child: React.ReactNode, index: number) => {
        if (!React.isValidElement(child)) return;
        const route = child.props.root ? 'root' : child.props.as;

        if (route !== viewID) return;
        return React.cloneElement(child, {});
    });

}

export const useBottomsheetTheme = function () {

}

export const useBottomsheetContent = function () {

}