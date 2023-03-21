import { ReactNode } from "react";
import { GetServerSideProps } from "next";

import { UserType } from "@/types";
import FormCreatorNovel from "@/components/Shared/FormCreatorNovel";
import { getAccessTokenOnServer } from "@/utils/cookies";
import { connectUserHandle } from "@/services/user.services";

export interface CreatorPageProps {
    user?: UserType
}

const CreatorPage = () => {
    return (
        <>
            {/* <FormCreatorNovel
                title="Tin tức mới"
                description="Các hoạt động gần đây nhất"
            /> */}
        </>
    );
};

export const getServerSideProps : GetServerSideProps = async (ctx) => {
    const token = getAccessTokenOnServer(ctx.req.headers.cookie as string)
    const userResponse = await connectUserHandle(token as string);

    if(!userResponse?.data.success) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}

CreatorPage.getLayout = (page: ReactNode) => {
    return (
        <FormCreatorNovel title="Tin tức mới" description="Các hoạt động gần đây nhất">
            {page}
        </FormCreatorNovel>
    );
};

export default CreatorPage;
