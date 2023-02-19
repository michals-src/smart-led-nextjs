import React from 'react'

import { BottomSheetContext } from '@context'
import Portal from './portal'
import BottomSheetView from './BottomSheetView'
import BottomSheetHeader from './BottomSheetHeader'
import BottomSheetContent from './BottomSheetContent'

let screens: any = {};

const BottomSheet = function ({ children, open, onClose }: {
    children?: any,
    open: boolean,
    onClose: () => void
}) {

    const [screenId, setScreenID] = React.useState<string>('root');
    const childrenArr = !Array.isArray(children) || children.length <= 0 ? [] : children;

    React.useEffect(() => {

        childrenArr.map((child: React.ReactNode, index: number) => {
            if (!React.isValidElement(child)) return

            const item: React.ReactElement = React.cloneElement(child,
                Object.assign({ ...child.props }, {
                    a: 'b'
                })
            );
            const route = item.props.root ? 'root' : item.props.as

            screens[route] = item
        })

        return function () {
            screens = {}
        }
    }, [])

    // React.useEffect(() => {
    //     setScreen((state: any) => {
    //         return screens[screenId]
    //     })
    // }, [screenId])

    const ContentItem = React.useCallback<any>(function () {
        return screens[screenId]
    }, [screenId])

    const next = function () {
        const routes = Object.keys(screens);
        const current = routes.indexOf(screenId);

        const index = current < routes.length - 1 ? current + 1 : current;
        setScreenID(routes[index]);
    }

    const back = function () {
        const routes = Object.keys(screens);
        const current = routes.indexOf(screenId);

        const index = current > 0 ? current - 1 : current;
        setScreenID(routes[index]);
    }

    const navigate = function (to: string, transferProps: object = {}) {
        if (Object.keys(screens).indexOf(to) < 0) return;

        const screen = screens[to];
        const screenWithTransferProps = React.cloneElement(screen,
            Object.assign({}, { transferProps })
        );

        screens = { ...screens, [`${to}`]: screenWithTransferProps }
        setScreenID(to);
    }

    const close = function () {
        setScreenID('root');
        onClose?.();
    }

    const ctxValue = React.useMemo(() => ({
        close,
        navigate,
        back
    }), [])

    return (
        <>
            {open && (
                <Portal>
                    <div className='fixed top-0 left-0 right-0 bottom-0 w-full h-full touch-none z-[99999]'>
                        <div className='w-[100vw] h-[100vh] absolute top-0 left-0' style={{ background: 'rgba(0,0,0,0.5)' }}></div>

                        <div className="w-full h-auto absolute bottom-0 left-0 touch-pan-x">
                            <div className="max-w-lg mx-auto bg-zinc-900 text-white relative overflow-hidden">
                                <BottomSheetContext.Provider value={ctxValue}>
                                    {<ContentItem />}
                                </BottomSheetContext.Provider>
                                <button onClick={e => next()}>Następny</button>
                                <button onClick={e => back()}>Wróć</button>
                            </div>
                        </div>
                    </div>
                </Portal>
            )}
        </>
    )
}

BottomSheet.dispalyName = "BottomSheet"

export default Object.assign(BottomSheet, {
    View: BottomSheetView,
    Header: BottomSheetHeader,
    Content: BottomSheetContent,
})