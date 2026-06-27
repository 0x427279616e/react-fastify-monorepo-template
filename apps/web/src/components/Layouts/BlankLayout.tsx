import { PropsWithChildren, Suspense } from 'react';
import App from '../../App';

const BlankLayout = ({ children }: PropsWithChildren) => {
    return (
        <App>
            <div className="flex flex-col min-h-screen">
                <Suspense>
                    <div className="text-black dark:text-white-dark min-h-screen">{children} </div>
                </Suspense>
            </div>
        </App>
    );
};

export default BlankLayout;
