# Use the official Bun image as the base image
FROM oven/bun:1 as base

# Set the working directory in the container
WORKDIR /app

COPY .env ./
# Copy package.json and bun.lockb (if you have one)
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of your application code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start the application with debugging
CMD ["bun", "run", "src/index.ts"]
