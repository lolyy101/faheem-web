const API_URL = "https://remission-retry-darkness.ngrok-free.dev/api";

const defaultHeaders = {
  "Content-Type": "application/json",
  "ngrok-skip-browser-warning": "true",
};

// ================= REGISTER =================
export const registerUser = async (data: {
  full_name: string;
  email: string;
  password: string;
}) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(data),
  });

  const text = await res.text();

  try {
    const json = JSON.parse(text);

    if (!res.ok) {
      throw new Error(json.message || "Register failed");
    }

    return json;
  } catch {
    throw new Error(text || "Register request failed");
  }
};

export const register = registerUser;

// ================= LOGIN =================
export const login = async (data: any) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(data),
  });

  const text = await res.text();
  console.log("API RESPONSE:", text);

  try {
    const json = JSON.parse(text);

    if (!res.ok) {
      throw new Error(json.message || "Login failed");
    }

    return json;
  } catch {
    throw new Error(text || "Login request failed");
  }
};

// ================= GET CURRENT USER =================
export const getMe = async (token: string) => {
  const res = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    headers: {
      ...defaultHeaders,
      Authorization: `Bearer ${token}`,
    },
  });

  const text = await res.text();

  try {
    const json = JSON.parse(text);

    if (!res.ok) {
      throw new Error(json.message || "Get user failed");
    }

    return json;
  } catch {
    throw new Error(text || "Get me request failed");
  }
};

// ================= COURSES =================
export const getCourses = async () => {
  const res = await fetch(`${API_URL}/courses`, {
    method: "GET",
    headers: defaultHeaders,
  });

  const text = await res.text();

  try {
    const json = JSON.parse(text);

    if (!res.ok) {
      throw new Error(json.message || "Get courses failed");
    }

    return json;
  } catch {
    throw new Error(text || "Get courses request failed");
  }
};

export const getCourseById = async (id: number) => {
  const res = await fetch(`${API_URL}/courses/${id}`, {
    method: "GET",
    headers: defaultHeaders,
  });

  const text = await res.text();

  try {
    const json = JSON.parse(text);

    if (!res.ok) {
      throw new Error(json.message || "Get course failed");
    }

    return json;
  } catch {
    throw new Error(text || "Get course request failed");
  }
};

export const addCourse = async (data: any, token: string) => {
  const res = await fetch(`${API_URL}/courses`, {
    method: "POST",
    headers: {
      ...defaultHeaders,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const text = await res.text();

  try {
    const json = JSON.parse(text);

    if (!res.ok) {
      throw new Error(json.message || "Add course failed");
    }

    return json;
  } catch {
    throw new Error(text || "Add course request failed");
  }
};

export const deleteCourse = async (id: number, token: string) => {
  const res = await fetch(`${API_URL}/courses/${id}`, {
    method: "DELETE",
    headers: {
      ...defaultHeaders,
      Authorization: `Bearer ${token}`,
    },
  });

  const text = await res.text();

  try {
    const json = JSON.parse(text);

    if (!res.ok) {
      throw new Error(json.message || "Delete course failed");
    }

    return json;
  } catch {
    throw new Error(text || "Delete course request failed");
  }
};

// ================= LESSONS =================
export const getLessons = async () => {
  const res = await fetch(`${API_URL}/lessons`, {
    method: "GET",
    headers: defaultHeaders,
  });

  const text = await res.text();

  try {
    const json = JSON.parse(text);

    if (!res.ok) {
      throw new Error(json.message || "Get lessons failed");
    }

    return json;
  } catch {
    throw new Error(text || "Get lessons request failed");
  }
};

export const addLesson = async (data: any, token: string) => {
  const res = await fetch(`${API_URL}/lessons`, {
    method: "POST",
    headers: {
      ...defaultHeaders,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const text = await res.text();

  try {
    const json = JSON.parse(text);

    if (!res.ok) {
      throw new Error(json.message || "Add lesson failed");
    }

    return json;
  } catch {
    throw new Error(text || "Add lesson request failed");
  }
};

export const deleteLesson = async (id: number, token: string) => {
  const res = await fetch(`${API_URL}/lessons/${id}`, {
    method: "DELETE",
    headers: {
      ...defaultHeaders,
      Authorization: `Bearer ${token}`,
    },
  });

  const text = await res.text();

  try {
    const json = JSON.parse(text);

    if (!res.ok) {
      throw new Error(json.message || "Delete lesson failed");
    }

    return json;
  } catch {
    throw new Error(text || "Delete lesson request failed");
  }
};

// ================= SUMMARY =================
export const getLessonsSummary = async () => {
  const res = await fetch(`${API_URL}/lessons/summary`, {
    method: "GET",
    headers: defaultHeaders,
  });

  const text = await res.text();

  try {
    const json = JSON.parse(text);

    if (!res.ok) {
      throw new Error(json.message || "Get lessons summary failed");
    }

    return json;
  } catch {
    throw new Error(text || "Get lessons summary request failed");
  }
};

// ================= FORGOT PASSWORD =================
export const forgotPassword = async (data: { email: string }) => {
  const res = await fetch(`${API_URL}/auth/forgot-password`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Forgot password failed");
  }

  return json;
};

const api = {
  registerUser,
  register,
  login,
  getMe,
  getCourses,
  getCourseById,
  addCourse,
  deleteCourse,
  getLessons,
  addLesson,
  deleteLesson,
  getLessonsSummary,
  forgotPassword,
};

export default api;