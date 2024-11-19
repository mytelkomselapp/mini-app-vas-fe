import { cn } from "../../lib/utils"; // pastikan fungsi `cn` tersedia di utils Anda

type ToastProps = {
    title: string;
    description: string;
    status?: "success" | "error";
    onClose: () => void;
};

const Toast = ({ title, description, status = "success", onClose }: ToastProps) => {
    return (
        <div
            style={{
                top: '16px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'calc(100% - 32px)',
            }}
            className={cn(
                "fixed mx-auto z-[100] p-4 rounded-lg shadow-lg text-white flex flex-col items-center w-",
                status === "success" ? "bg-green-500" : "bg-[#FEF2F4]"
            )}
        >
            <div>
                <span className="text-primaryRed font-bold text-sm">{title}</span>
                <span className="text-primaryRed text-sm">{description}</span>
            </div>
        </div>
    );
};


export default Toast;
