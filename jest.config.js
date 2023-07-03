module.exports = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	rootDir: ".",
	modulePaths: ["<rootDir>"],
	moduleDirectories: ["node_modules", "src"],
	setupFiles: ["dotenv/config"],
	setupFilesAfterEnv: ["<rootDir>/setupJest.js"],
};
