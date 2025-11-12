import z from "zod";

export const userSignupInput = z
  .object({
    name: z
      .string()
      .min(3, "Name should be at least 3 character long")
      .max(15, "Name should not exceed 15 character"),
    age: z.number(),
    email: z.email(),
    username: z
      .string()
      .min(3, "username should be atleast 3 character long ")
      .max(13, "username should not exceed more than 13 characters"),
    password: z
      .string()
      .min(6, "Password should be at least 6 character long")
      .max(15, "Password shouldn't exceed 15 character"),
    confirmPassword: z
      .string()
      .min(6, "Password should be at least 6 character long")
      .max(15, "Password shouldn't exceed 15 character"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export const userLoginInput = z.object({
  email: z.email(),
  username: z
    .string()
    .min(3, "username should be atleast 3 character long ")
    .max(13, "username should not exceed more than 13 characters"),
  password: z
    .string()
    .min(6, "Password should be at least 6 character long")
    .max(15, "Password shouldn't exceed 15 character"),
});

export const searchTrainSchema = z.object({
  source: z.string("Please input the source"),
  destination: z.string("Please input the destination"),
});

export const StationAndThereCodename = {
  "New Delhi": "NDLS",
  "Mumbai Central": "MMCT",
  "Howrah Junction": "HWH",
  "Chennai Central": "MAS",
  "Bengaluru City": "SBC",
  "Hyderabad Deccan": "HYB",
  "Ahmedabad Junction": "ADI",
  "Kolkata": "KOAA",
  "Pune Junction": "PUNE",
  "Jaipur Junction": "JP",
  "Lucknow": "LKO",
  "Kanpur Central": "CNB",
  "Nagpur Junction": "NGP",
  "Indore Junction": "INDB",
  "Bhopal Junction": "BPL",
  "Patna Junction": "PNBE",
  "Vadodara Junction": "BRC",
  "Ludhiana Junction": "LDH",
  "Agra Cantt": "AGC",
  "Varanasi Junction": "BSB",
  "Nashik Road": "NK",
  "Vijayawada Junction": "BZA",
  "Visakhapatnam": "VSKP",
  "Bhubaneswar": "BBS",
  "Coimbatore Junction": "CBE",
  "Thiruvananthapuram Central": "TVC",
  "Kochi": "ERS",
  "Madurai Junction": "MDU",
  "Mysuru Junction": "MYS",
  "Amritsar Junction": "ASR",
  "Chandigarh": "CDG",
  "Guwahati": "GHY",
  "Ranchi Junction": "RNC",
  "Jodhpur Junction": "JU",
  "Surat": "ST",
  "Rajkot Junction": "RJT",
  "Gwalior Junction": "GWL",
  "Jabalpur": "JBP",
  "Raipur Junction": "R",
  "Bilaspur Junction": "BSP",
  "Dehradun": "DDN",
  "Haridwar Junction": "HW",
  "Jammu Tawi": "JAT",
  "Udaipur City": "UDZ",
  "Ajmer Junction": "AII",
  "Allahabad Junction": "PRYJ",
  "Gorakhpur Junction": "GKP",
  "Bareilly": "BE",
  "Meerut City": "MTC",
  "Ghaziabad": "GZB",
  "Faridabad": "FDB"
} as const;