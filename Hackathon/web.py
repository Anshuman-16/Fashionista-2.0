import streamlit as st
from google import genai
from PIL import Image
import io
import os
import uuid

# ================== CONFIG ================== #

GENAI_API_KEY = "YOUR_API_KEY"  # ← Add your key here

client = genai.Client(api_key=GENAI_API_KEY)

st.set_page_config(
    page_title="Fashionista",
    layout="wide",
    initial_sidebar_state="expanded"
)

# ================== PREMIUM CSS ================== #

st.markdown("""
<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');

html, body, [class*="css"] {
    font-family: 'Playfair Display', serif;
}

.stApp {
    background-color: #0f3d3e;
}

.main-title {
    text-align: center;
    font-size: 64px;
    font-weight: 700;
    color: #f8e9a1;
    margin-top: 60px;
}

.subtitle {
    text-align: center;
    color: white;
    font-size: 22px;
    margin-bottom: 30px;
}

.option-btn button {
    width: 100%;
    padding: 20px;
    border-radius: 18px;
    border: 1px solid rgba(255, 215, 0, 0.4);
    background: rgba(255,255,255,0.05);
    color: white;
    font-size: 18px;
    transition: 0.3s;
}

.option-btn button:hover {
    border: 1px solid gold;
    transform: scale(1.03);
}

.watermark {
    position: fixed;
    bottom: 10px;
    right: 15px;
    font-size: 13px;
    color: rgba(255,255,255,0.6);
}
</style>
""", unsafe_allow_html=True)

# ================== SESSION ================== #

if "mode" not in st.session_state:
    st.session_state.mode = None

if "history" not in st.session_state:
    st.session_state.history = {}

if "user" not in st.session_state:
    st.session_state.user = None

# ================== LOGIN ================== #

col1, col2 = st.columns([8, 1])
with col2:
    username = st.text_input("Login", placeholder="Enter name")
    if username:
        st.session_state.user = username
        if username not in st.session_state.history:
            st.session_state.history[username] = []

# ================== TITLE ================== #

st.markdown('<div class="main-title">Fashionista</div>', unsafe_allow_html=True)
st.markdown(
    '<div class="subtitle">StyleSense : Generative AI–Powered Fashion Recommendation System</div>',
    unsafe_allow_html=True
)

# ================== MODE SELECTION ================== #

st.markdown("### Choose Your Experience")

colA, colB = st.columns(2)

with colA:
    if st.button("👗 The Personal Stylist: Ultimate Shopping Blueprint"):
        st.session_state.mode = "stylist"

with colB:
    if st.button("🖼️ The Style Gallery: Wardrobe Picks"):
        st.session_state.mode = "gallery"

# ================== FORM ================== #

if st.session_state.mode:

    st.divider()
    st.subheader("Your Style Profile")

    gender = st.radio("Gender", ["Male", "Female"], horizontal=True)

    body_types = [
        "Pear",
        "Rectangle",
        "Hourglass",
        "Inverted Triangle",
        "Triangle",
        "Others"
    ]

    body = st.selectbox("Body Type", body_types)
    if body == "Others":
        body = st.text_input("Enter Body Type")

    st.markdown("### Select Skin Tone")

    skin_tones = ["#F6D1B1", "#E0AC69", "#C68642", "#8D5524", "#3B2F2F"]
    skin = st.radio("Skin Tone", skin_tones, horizontal=True)

    occasion_list = ["College", "Party", "Meeting", "Wedding", "Festival", "Date", "Others"]
    occasion = st.selectbox("Occasion", occasion_list)
    if occasion == "Others":
        occasion = st.text_input("Enter Occasion")

    budget = None
    if st.session_state.mode == "stylist":
        budget = st.selectbox(
            "Budget",
            [
                "Low (Below 3000 INR)",
                "Mid (3000-6000 INR)",
                "High (Above 6000 INR)"
            ]
        )

    color_pref = st.text_input("Preferred Outfit Color")
    include_accessories = st.radio("Include Accessories?", ["Yes", "No"], horizontal=True)

    uploaded_files = st.file_uploader(
        "Upload Images (Optional)",
        accept_multiple_files=True
    )

    camera_photo = st.camera_input("Or Take a Photo")

    # ================== GENERATE ================== #

    if st.button("✨ Generate Style"):

        with st.spinner("Creating your premium style blueprint..."):

            prompt = f"""
Create detailed fashion recommendations in bullet points.

Profile:
Gender: {gender}
Body Type: {body}
Skin Tone: {skin}
Occasion: {occasion}
Budget: {budget}
Preferred Color: {color_pref}
Accessories: {include_accessories}

Requirements:
- 2-3 outfit variations
- Detailed styling breakdown
- Accessories if selected
- Final verdict summary
- Color combinations
"""

            # ---------- TEXT GENERATION ---------- #

            text_response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt
            )

            result_text = text_response.text

            st.markdown("## 🧥 Your Style Blueprint")
            st.markdown(result_text)

            # ---------- IMAGE GENERATION ---------- #

            st.markdown("### 👗 Visual Inspirations")

            image_prompt = f"""
Premium fashion photography of a {occasion} outfit for {gender},
{color_pref} theme, luxury styling, high detail, studio lighting
"""

            image_response = client.models.generate_content(
                model="gemini-2.0-flash-exp-image-generation",
                contents=image_prompt
            )

            if image_response.candidates:
                for part in image_response.candidates[0].content.parts:
                    if hasattr(part, "inline_data") and part.inline_data:
                        image_bytes = part.inline_data.data
                        image = Image.open(io.BytesIO(image_bytes))
                        st.image(image, width=350)

            # ---------- SAVE HISTORY ---------- #

            if st.session_state.user:
                st.session_state.history[st.session_state.user].append(result_text)

            st.success("✨ Exceptional taste! Your fashion aura is unmatched.")

# ================== SIDEBAR HISTORY ================== #

if st.session_state.user:
    with st.sidebar:
        st.title("Previous Looks")
        for past in st.session_state.history[st.session_state.user]:
            st.markdown("---")
            st.write(past[:200] + "...")

# ================== WATERMARK ================== #

st.markdown(
    '<div class="watermark">This website is developed by The Fashionista team - (Anshuman, Nitish, Vaishnavi, Renusri)</div>',
    unsafe_allow_html=True
)