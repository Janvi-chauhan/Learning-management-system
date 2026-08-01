import api from "./api";

/**
 * Subscribe Email
 */
export const subscribeEmail = async (email) => {
  try {
    const response = await api.post("/subscribe", {
      email,
    });

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Something went wrong.",
      }
    );
  }
};

/**
 * Get All Subscribers
 */
export const getSubscribers = async () => {
  try {
    const response = await api.get("/subscribers");

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Unable to fetch subscribers.",
      }
    );
  }
};

/**
 * Delete Subscriber
 */
export const deleteSubscriber = async (id) => {
  try {
    const response = await api.delete(`/subscribers/${id}`);

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Unable to delete subscriber.",
      }
    );
  }
};