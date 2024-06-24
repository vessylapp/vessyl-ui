"use client";
import {Card, Divider, CardBody, CardHeader} from "@nextui-org/react";
import Link from "next/link";

const ResourceCard = ({ resource }) => {
    const borderColor = resource.container.running ? 'border-green-500' : 'border-red-500';

    return (
        <Link href={`/dashboard/resources/${resource.name}`}>
            <Card variant="bordered" className={"w-[300px] border-2 " + borderColor}>
                <CardHeader className={"px-5 py-5"}>
                    <h4 className={"font-bold text-xl"}>{resource.name}</h4>
                    <p className={"text-sm ml-3"}>{resource.type}</p>
                </CardHeader>
                <Divider/>
                <CardBody className={"px-5 py-5"}>
                    <h4 className={"font-bold text-xl"}>Git URL</h4>
                    <p>{resource.git_url}</p>
                </CardBody>
            </Card>
        </Link>
    );
};

export default ResourceCard;