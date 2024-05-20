import Image from "next/image";

type welcomeCardProps = {
    // postsDescription: string,
    // postsAwardInBP: number,
}

const WelcomeCard = ({ }: welcomeCardProps) => {
    return (
        <div className="flex flex-col gap-y-0.5">
            <div>
              Choose language
            </div>
            <Image
                src={"hello.svg"}
                alt={'hello'}
                width={332}
                height={221}
            />
        </div>
    )
}

export default WelcomeCard;