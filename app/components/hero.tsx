import InstallCommand from "./install-command";
import InteractiveTerminal from "./terminal";

export const Hero = () => {
    return (
        <div className="grid grid-cols-2">
            <h1 className="text-4xl font-bold">Hero</h1>
            <div className="flex flex-col gap-3">
                <div className="mb-2 mt-8">
                    <InstallCommand />
                </div>
                <InteractiveTerminal />
            </div>
        </div>
    );
};