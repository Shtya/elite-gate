import Spinner from "@/components/shared/Spinner";
import SpinnerLarge from "@/components/shared/SpinnerLarge";

export default function Loading() {

    return <div className="h-screen flex justify-center items-center">
        <SpinnerLarge />
    </div>
}