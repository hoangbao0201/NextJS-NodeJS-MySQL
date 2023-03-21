import { GetServerSideProps, NextPage } from "next";
import { ReactNode } from "react";
import MainLayout from "@/components/Layouts/MainLayout";
import FormCreatorNovel from "@/components/Shared/FormCreatorNovel";
import ContentFormEditNovel from "@/components/Shared/FormCreatorNovel/ContentFormEditNovel";
import { getAccessTokenOnServer } from "@/utils/cookies";
import { connectUserHandle } from "@/services/user.services";

export interface CreatorEditNovelPageProps {
    novel?: any;
}

const CreatorEditNovelPage = ({ novel } : CreatorEditNovelPageProps) => {
    return (
        <>
            {novel ? (
                <ContentFormEditNovel novel={novel} />
            ) : (
                <p>Không tìm thấy thông tin</p>
            )}
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

CreatorEditNovelPage.getLayout = (page: ReactNode) => {
    return (
        <FormCreatorNovel
            title="Sửa truyện"
            description="Dù báo lỗi đúng hay sai nhớ đều phải trả lời để BTV có thể đóng báo lỗi"
        >
            {page}
        </FormCreatorNovel>
    );
};

export default CreatorEditNovelPage;
