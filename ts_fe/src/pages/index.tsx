import LoadingPage from "@/components/loading";
import { useRouter } from "next/router";
import { useEffect } from "react";

const NullPage = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/booth');
    }, []);
    return <LoadingPage msg="부스 페이지로 이동중!"></LoadingPage>
}

export default NullPage;