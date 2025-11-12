import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // Clear existing data
  console.log("🗑️  Clearing existing data...");
  await prisma.tickets.deleteMany();
  await prisma.train.deleteMany();
  await prisma.user.deleteMany();
  console.log("✅ Existing data cleared");

  // Create sample users
  console.log("👥 Creating users...");
  const hashedPassword = await bcrypt.hash("password123", 10);

  const user1 = await prisma.user.create({
    data: {
      name: "Rahul Sharma",
      age: 28,
      email: "rahul.sharma@example.com",
      userName: "rahul_sharma",
      password: hashedPassword,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Priya Patel",
      age: 32,
      email: "priya.patel@example.com",
      userName: "priya_patel",
      password: hashedPassword,
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: "Amit Kumar",
      age: 25,
      email: "amit.kumar@example.com",
      userName: "amit_kumar",
      password: hashedPassword,
    },
  });

  console.log(`✅ Created ${3} users`);

  // Create sample trains
  console.log("🚂 Creating trains...");
  const trains = await Promise.all([
    prisma.train.create({
      data: {
        trainNumber: "12301",
        trainName: "Rajdhani Express",
        origin: "New Delhi",
        destination: "Howrah Junction",
        departure: "17:00",
        arrival: "10:00",
        userId: user1.userId,
      },
    }),
    prisma.train.create({
      data: {
        trainNumber: "12951",
        trainName: "Mumbai Rajdhani",
        origin: "Mumbai Central",
        destination: "New Delhi",
        departure: "16:55",
        arrival: "08:35",
        userId: user1.userId,
      },
    }),
    prisma.train.create({
      data: {
        trainNumber: "12621",
        trainName: "Tamil Nadu Express",
        origin: "New Delhi",
        destination: "Chennai Central",
        departure: "22:30",
        arrival: "07:05",
        userId: user1.userId,
      },
    }),
    prisma.train.create({
      data: {
        trainNumber: "12009",
        trainName: "Shatabdi Express",
        origin: "New Delhi",
        destination: "Jaipur Junction",
        departure: "06:05",
        arrival: "10:30",
        userId: user1.userId,
      },
    }),
    prisma.train.create({
      data: {
        trainNumber: "12261",
        trainName: "Duronto Express",
        origin: "Howrah Junction",
        destination: "New Delhi",
        departure: "20:50",
        arrival: "07:55",
        userId: user1.userId,
      },
    }),
    prisma.train.create({
      data: {
        trainNumber: "12423",
        trainName: "Dibrugarh Rajdhani",
        origin: "New Delhi",
        destination: "Guwahati",
        departure: "15:50",
        arrival: "12:30",
        userId: user1.userId,
      },
    }),
    prisma.train.create({
      data: {
        trainNumber: "12723",
        trainName: "Telangana Express",
        origin: "Hyderabad Deccan",
        destination: "New Delhi",
        departure: "17:40",
        arrival: "14:00",
        userId: user1.userId,
      },
    }),
    prisma.train.create({
      data: {
        trainNumber: "12802",
        trainName: "Purushottam Express",
        origin: "New Delhi",
        destination: "Puri",
        departure: "18:25",
        arrival: "11:00",
        userId: user1.userId,
      },
    }),
    prisma.train.create({
      data: {
        trainNumber: "12628",
        trainName: "Karnataka Express",
        origin: "New Delhi",
        destination: "Bengaluru City",
        departure: "20:50",
        arrival: "06:00",
        userId: user1.userId,
      },
    }),
    prisma.train.create({
      data: {
        trainNumber: "12431",
        trainName: "Trivandrum Rajdhani",
        origin: "Thiruvananthapuram Central",
        destination: "New Delhi",
        departure: "19:00",
        arrival: "11:00",
        userId: user1.userId,
      },
    }),
  ]);

  console.log(`✅ Created ${trains.length} trains`);

  // Create sample tickets
  console.log("🎫 Creating tickets...");
  
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const tickets = await Promise.all([
    // Tickets for Rajdhani Express (12301)
    prisma.tickets.create({
      data: {
        passengerName: "Raj Malhotra",
        seatNumber: "A1-23",
        trainId: trains[0].trainId,
        class: "FIRST_AC",
        dateOfJourney: tomorrow,
        userId: user1.userId,
        bookingStatus: "CONFIRM",
      },
    }),
    prisma.tickets.create({
      data: {
        passengerName: "Sneha Kapoor",
        seatNumber: "B2-45",
        trainId: trains[0].trainId,
        class: "SECOND_AC",
        dateOfJourney: tomorrow,
        userId: user2.userId,
        bookingStatus: "CONFIRM",
      },
    }),
    prisma.tickets.create({
      data: {
        passengerName: "Vikram Singh",
        seatNumber: "C3-67",
        trainId: trains[0].trainId,
        class: "THIRD_AC",
        dateOfJourney: tomorrow,
        userId: user3.userId,
        bookingStatus: "RAC",
      },
    }),

    // Tickets for Mumbai Rajdhani (12951)
    prisma.tickets.create({
      data: {
        passengerName: "Anita Desai",
        seatNumber: "A1-15",
        trainId: trains[1].trainId,
        class: "FIRST_AC",
        dateOfJourney: nextWeek,
        userId: user1.userId,
        bookingStatus: "CONFIRM",
      },
    }),
    prisma.tickets.create({
      data: {
        passengerName: "Karan Mehta",
        seatNumber: "S4-89",
        trainId: trains[1].trainId,
        class: "SLEEPER",
        dateOfJourney: nextWeek,
        userId: user2.userId,
        bookingStatus: "CONFIRM",
      },
    }),

    // Tickets for Tamil Nadu Express (12621)
    prisma.tickets.create({
      data: {
        passengerName: "Suresh Raman",
        seatNumber: "B2-33",
        trainId: trains[2].trainId,
        class: "SECOND_AC",
        dateOfJourney: tomorrow,
        userId: user3.userId,
        bookingStatus: "CONFIRM",
      },
    }),
    prisma.tickets.create({
      data: {
        passengerName: "Lakshmi Iyer",
        seatNumber: "C3-78",
        trainId: trains[2].trainId,
        class: "THIRD_AC",
        dateOfJourney: tomorrow,
        userId: user1.userId,
        bookingStatus: "WAITLIST",
      },
    }),

    // Tickets for Shatabdi Express (12009)
    prisma.tickets.create({
      data: {
        passengerName: "Deepak Sharma",
        seatNumber: "CC-12",
        trainId: trains[3].trainId,
        class: "CHAIR_CAR",
        dateOfJourney: today,
        userId: user2.userId,
        bookingStatus: "CONFIRM",
      },
    }),
    prisma.tickets.create({
      data: {
        passengerName: "Meera Joshi",
        seatNumber: "CC-45",
        trainId: trains[3].trainId,
        class: "CHAIR_CAR",
        dateOfJourney: today,
        userId: user3.userId,
        bookingStatus: "CONFIRM",
      },
    }),

    // Tickets for Duronto Express (12261)
    prisma.tickets.create({
      data: {
        passengerName: "Arijit Chatterjee",
        seatNumber: "A1-08",
        trainId: trains[4].trainId,
        class: "FIRST_AC",
        dateOfJourney: nextWeek,
        userId: user1.userId,
        bookingStatus: "CONFIRM",
      },
    }),
    prisma.tickets.create({
      data: {
        passengerName: "Pooja Ghosh",
        seatNumber: "S4-56",
        trainId: trains[4].trainId,
        class: "SLEEPER",
        dateOfJourney: nextWeek,
        userId: user2.userId,
        bookingStatus: "RAC",
      },
    }),

    // Tickets for Karnataka Express (12628)
    prisma.tickets.create({
      data: {
        passengerName: "Naveen Kumar",
        seatNumber: "B2-22",
        trainId: trains[8].trainId,
        class: "SECOND_AC",
        dateOfJourney: tomorrow,
        userId: user3.userId,
        bookingStatus: "CONFIRM",
      },
    }),
    prisma.tickets.create({
      data: {
        passengerName: "Divya Rao",
        seatNumber: "C3-44",
        trainId: trains[8].trainId,
        class: "THIRD_AC",
        dateOfJourney: tomorrow,
        userId: user1.userId,
        bookingStatus: "CONFIRM",
      },
    }),

    // General class tickets
    prisma.tickets.create({
      data: {
        passengerName: "Ramesh Yadav",
        seatNumber: "GEN-101",
        trainId: trains[2].trainId,
        class: "GENERAL",
        dateOfJourney: today,
        userId: user2.userId,
        bookingStatus: "CONFIRM",
      },
    }),
    prisma.tickets.create({
      data: {
        passengerName: "Sunita Devi",
        seatNumber: "GEN-102",
        trainId: trains[2].trainId,
        class: "GENERAL",
        dateOfJourney: today,
        userId: user3.userId,
        bookingStatus: "CONFIRM",
      },
    }),

    // Cancelled ticket
    prisma.tickets.create({
      data: {
        passengerName: "Cancelled Passenger",
        seatNumber: "A1-99",
        trainId: trains[0].trainId,
        class: "FIRST_AC",
        dateOfJourney: tomorrow,
        userId: user1.userId,
        bookingStatus: "CANCELLED",
      },
    }),
  ]);

  console.log(`✅ Created ${tickets.length} tickets`);

  console.log("\n🎉 Database seeding completed successfully!");
  console.log("\n📊 Summary:");
  console.log(`   - Users: ${3}`);
  console.log(`   - Trains: ${trains.length}`);
  console.log(`   - Tickets: ${tickets.length}`);
  console.log("\n🔐 Test credentials:");
  console.log(`   Email: rahul.sharma@example.com`);
  console.log(`   Username: rahul_sharma`);
  console.log(`   Password: password123`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error during seeding:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
