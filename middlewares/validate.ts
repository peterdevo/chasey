import { ObjectShape, OptionalObjectSchema } from "yup/lib/object";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export function validate(
  schema: OptionalObjectSchema<ObjectShape>,
  handler: NextApiHandler
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (["POST", "PUT"].includes(req.method)) {
      try {
        await schema.validate(req.body);
      } catch (error) {
        return res.status(400).json(error);
      }
    }
    await handler(req, res);
  };
}
