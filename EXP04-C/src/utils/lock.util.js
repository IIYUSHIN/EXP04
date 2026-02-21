// Lock Utility — Redis-based distributed lock using SET NX EX pattern
// This prevents race conditions when multiple requests try to book the same seat

const { v4: uuidv4 } = require("uuid");
const { redisClient } = require("../config/redis");

// acquireLock — Tries to set a key in Redis with two special options:
//   NX = "only set if key does NOT already exist" (first request wins)
//   EX = "auto-expire after ttl seconds" (prevents permanent deadlocks)
// Returns a unique UUID token if lock acquired, or null if another process holds the lock
const acquireLock = async (key, ttl = 10) => {
    // Generate a unique ID for this lock owner
    const lockValue = uuidv4();

    // Try to acquire the lock using SET with NX and EX
    const result = await redisClient.set(key, lockValue, {
        NX: true,  // Only set if key does NOT exist
        EX: ttl    // Expire after ttl seconds
    });

    // If result is null, the key already exists (another process has the lock)
    if (!result) return null;

    // Lock acquired — return the unique token
    return lockValue;
};

// releaseLock — Safely releases a lock by checking ownership first
// Only deletes the lock if the stored value matches our token
// This prevents Process A from accidentally releasing Process B's lock
const releaseLock = async (key, lockValue) => {
    // Read the current value stored in Redis for this lock key
    const storedValue = await redisClient.get(key);

    // Only delete if WE own this lock (our UUID matches)
    if (storedValue === lockValue) {
        await redisClient.del(key);
    }
};

module.exports = { acquireLock, releaseLock };
