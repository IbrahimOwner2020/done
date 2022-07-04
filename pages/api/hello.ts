import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	app: {
		name: string;
		description: string;
		version: number;
	};
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	res.status(200).json({
		app: {
			name: "Done.",
			description:
				"It is an open source todo web app that will consists of tones of features",
			version: 1.1,
		},
	});
}
