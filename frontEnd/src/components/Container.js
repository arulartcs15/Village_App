import React from "react";
import { Link, Route, withRouter,Switch,Redirect } from 'react-router-dom'
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import Village from "./Village";
import Products from "./Products";
import Residents from "./Residents";
import Events from "./Events";
import DeleteAccount from "./DeleteAccount";
import Admin from "./Admin";
import Swal from "sweetalert2";
import { asyncAccountDetails } from "../actions/usersActions";
import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'
import { Router } from "react-router-dom/cjs/react-router-dom.min";

const translationEn = {
    VILLAGE: "VILLAGE UPDATE APP", Home: "Home", village: "village", Residents: "Residents", Events: "Events", products: "products",
    DeleteAccount: "DeleteAccount", admin: "Admin", Register: "Register", Login: "Login", Logout: "Logout", Register: "Register",
    Admin: "Admin", Name: "Name", PhoneNumber: "PhoneNumber", Password: "Password", name: "Enter your name", phonenumber: "Enter your phonenumber",
    password: "Enter password", Create: "Create", shareName: "We'll never share your name with anyone else",
    sharePhoneNumber: "We'll never share your Phonenumber with anyone else", sharePassword: "We'll never share your password with anyone else", blankName: "Name cannot be blank",
    blankPhoneNumber: "phoneNumber cannot be blank", blankPassword: "Password cannot be blank", SNO: "S.No", AdminName: "Admin Name", ContactNumber: "Contact Number", Description: "Description",
    Modify: "Modify", Show: "Show", Edit: "Edit", Suspend: "Suspend", Restore: "Restore", Delete: "Delete", Close: "Close", VillageName: "VillageName", Lists: "Lists of Admins",Restored: "Lists of Restore",
     NoAdmin: "No Admins are available",AdminRestore: "No Admins to Restore", ListsEvents:"Lists of Events",EventTitle : "Event Title",StartDate :"Start Date",
     EndDate : "End Date", NoEvents : "No Events are scheduled" , AllProducts :"All Products",MyProducts : "My Products" , ListsProducts:"Lists of All Products", ProductName:"Product Name",Price:"Price",
     NoProducts :"No Products are available",Quantity:"Quantity", Uploadimage :"Upload Image",productname: "Enter product name",Enterprice :"Enter price",Enterquantity:"Enter quantity",Enterdescription : "Enter description",
     shareProductname : "We'll never share your Product Name with anyone else." , shareProductprice : "We'll never share your Product Price with anyone else." ,  shareProductdetails  : "We'll never share your Product Details with anyone else.",
     EditProduct:"Edit Product", AddProduct : "Add Product" , blankProduct :"Name of product cannot be blank", blankprice :"price of product cannot be blank", blankquantity :"product quantity cannot be blank",
     blankdescription :"Description cannot be blank" , deletemsg :"Click below to delete your account...", DeleteAccount : "Delete Account" ,
     Welcome:"Welcome to the Village Update App, your one-stop destination for staying connected and informed about all the happenings in your village!  Our platform brings together all registered community members, providing a seamless experience to access information on upcoming events programs, and local activities." ,
     comprehensive:"With the Village Update App, you can effortlessly browse through a comprehensive list of events and programs taking place in your village,ensuring you never miss out on anything significant.",
     empower:"  But that's not all! We also empower our users with a unique marketing feature, enabling them to showcase their creativity and  entrepreneurial spirit. Create and display your own products on our dedicated page, where fellow villagers can explore and support local businesses.",
     Join:"Join us now and experience the true essence of community, connectivity, and prosperity through the Village Update App!"
}

const translationTe = {
    VILLAGE: "విలేజ్ అప్ డేట్ యాప్", Home: "హోమ్", village: "ఊరు", Residents: "నివాసితులు", Events: "ఈవెంట్స్", products: "ఉత్పత్తులు",
    DeleteAccount: "ఖాతాను తొలగించండి", admin: "అడ్మిన్", Register: "రిజిస్టర్", Login: "లాగిన్", Logout: "లాగ్అవుట్", Register: "రిజిస్టర్",
    Admin: "అడ్మిన్", Name: "పేరు", PhoneNumber: "ఫోన్ నెంబరు", Password: "పాస్ వర్డ్", name: "మీ పేరు నమోదు చేయండి",
    phonenumber: "మీ ఫోన్ నెంబరు నమోదు చేయండి", password: "పాస్ వర్డ్ నమోదు చేయండి", Create: "సృష్టించు", shareName: "మేము మీ పేరును మరెవరితోనూ పంచుకోము",
    sharePhoneNumber: "మేము మీ ఫోన్ నెంబరును వేరొకరితో పంచుకోము", sharePassword: "మీ పాస్ వర్డ్ ని మేం ఎవరితోనూ పంచుకోం.", blankName: "పేరు ఖాళీగా ఉండరాదు",
    blankPhoneNumber: "ఫోన్ నెంబరు ఖాళీగా ఉండరాదు", blankPassword: "పాస్ వర్డ్ ఖాళీగా ఉండరాదు", SNO: "సీరియల్ నెంబరు", AdminName: "అడ్మిన్ పేరు", ContactNumber: "కాంటాక్ట్ నెంబరు", Description: "వివరణ",
    Modify: "సవరించండి", Show: "ఇతర వివరాలు తెలుసు", Edit: "సవరించు", Suspend: "సస్పెండ్", Restore: "పునరుద్ధరించు", Delete: "తొలగించు", Close: "క్లోజ్", VillageName: "గ్రామం పేరు", Lists: "నిర్వాహకుల జాబితా",
    Restored: "పునరుద్ధరణ జాబితాలు", NoAdmin: "అడ్మిన్స్ డేటా అందుబాటులో లేదు",AdminRestore: "పునరుద్ధరించడానికి నిర్వాహకులు లేరు",ListsEvents:"ఈవెంట్‌ల జాబితాలు",EventTitle : "ఈవెంట్ పేరు",StartDate :"ప్రారంభ తేదీ",
    EndDate : "ముగింపు తేదీ", NoEvents : "ఈవెంట్‌లు ఏవీ షెడ్యూల్ చేయబడలేదు",AllProducts :"అన్ని ఉత్పత్తులు",MyProducts : "నా ఉత్పత్తులు" , ListsProducts:"అన్ని ఉత్పత్తుల జాబితాలు", ProductName:"ఉత్పత్తి పేరు",Price:"ధర",
    NoProducts :"ఏ ఉత్పత్తులు అందుబాటులో లేవు",Quantity:"పరిమాణం", Uploadimage :"చిత్రాన్ని అప్‌లోడ్ చేయండి",productname: "Enter product name",Enterprice :"ఉత్పత్తి పేరును నమోదు చేయండి",Enterquantity:"పరిమాణాన్ని నమోదు చేయండి",Enterdescription : "వివరణను నమోదు చేయండి",
    shareProductname : "మేము మీ ఉత్పత్తి పేరును మరెవరితోనూ భాగస్వామ్యం చేయము." , shareProductprice : "మేము మీ ఉత్పత్తి ధరను మరెవరితోనూ పంచుకోము." ,  shareProductdetails  : "మేము మీ ఉత్పత్తి వివరాలను మరెవరితోనూ భాగస్వామ్యం చేయము.",
    EditProduct:"ఉత్పత్తిని సవరించండి", AddProduct : "ఉత్పత్తిని జోడించండి",blankProduct :"ఉత్పత్తి పేరు ఖాళీగా ఉండకూడదు", blankprice :"ఉత్పత్తి ధర ఖాళీగా ఉండకూడదు", blankquantity :"ఉత్పత్తి పరిమాణం ఖాళీగా ఉండకూడదు",
    blankdescription :"వివరణ ఖాళీగా ఉండకూడదు", deletemsg :"మీ ఖాతాను తొలగించడానికి దిగువ క్లిక్ చేయండి...", DeleteAccount : "ఖాతాను తొలగించండి",
    Welcome:"విలేజ్ అప్‌డేట్ యాప్‌కి స్వాగతం, కనెక్ట్ అయి ఉండటానికి మరియు మీ గ్రామంలో జరిగే అన్ని సంఘటనల గురించి తెలియజేయడానికి మీ వన్-స్టాప్ గమ్యం! మా ప్లాట్‌ఫారమ్ నమోదిత కమ్యూనిటీ సభ్యులందరినీ ఒకచోట చేర్చి, రాబోయే ఈవెంట్‌లు, ప్రోగ్రామ్‌లు మరియు స్థానిక కార్యకలాపాలపై సమాచారాన్ని యాక్సెస్ చేయడానికి అతుకులు లేని అనుభవాన్ని అందిస్తుంది." ,
    comprehensive:"విలేజ్ అప్‌డేట్ యాప్‌తో, మీరు మీ గ్రామంలో జరిగే ఈవెంట్‌లు మరియు ప్రోగ్రామ్‌ల యొక్క సమగ్ర జాబితాను సులభంగా బ్రౌజ్ చేయవచ్చు, మీరు ముఖ్యమైన వాటిని ఎప్పటికీ కోల్పోకుండా చూసుకోవచ్చు.",
    empower:"అయితే అంతే కాదు! మేము మా వినియోగదారులకు వారి సృజనాత్మకత మరియు వ్యవస్థాపక స్ఫూర్తిని ప్రదర్శించడానికి వీలు కల్పిస్తూ, ప్రత్యేకమైన మార్కెటింగ్ ఫీచర్‌తో వారికి అధికారం కల్పిస్తాము. మా అంకితమైన పేజీలో మీ స్వంత ఉత్పత్తులను సృష్టించండి మరియు ప్రదర్శించండి, ఇక్కడ తోటి గ్రామస్తులు స్థానిక వ్యాపారాలను అన్వేషించగలరు మరియు మద్దతు ఇవ్వగలరు.",
    Join:"ఇప్పుడే మాతో చేరండి మరియు విలేజ్ అప్‌డేట్ యాప్ ద్వారా సంఘం, కనెక్టివిటీ మరియు శ్రేయస్సు యొక్క నిజమైన సారాన్ని అనుభవించండి!"

}

const translationTa = {
    VILLAGE: "கிராம புதுப்பிப்பு பயன்பாடு", Home: "வீடு", Village: "கிராமம்", Residents: "குடியிருப்பாளர்கள்", Events: "நிகழ்வுகள்",
    products: "தயாரிப்புகள்", DeleteAccount: "கணக்கை நீக்குக", Admin: "நிர்வாகம்", Register: "பதிவு", Login: "உள்நுழைய", Logout: "வெளியேறு",
    Register: "பதிவு", admin: "நிர்வாக", Name: "பெயர்", PhoneNumber: "தொலைபேசி எண்", Password: "அடையாளச் சொல்", name: "உங்கள் பெயரை உள்ளிடவும்",
    phonenumber: "உங்கள் தொடர்பு எண்ணை அளிக்கவும்", password: "கடவுச்சொல்லை உள்ளிடவும்", Create: "உருவாக்கு", shareName: "உங்கள் பெயரை வேறு யாருடனும் பகிர்ந்து கொள்ள மாட்டோம்",
    sharePhoneNumber: "உங்கள் தொலைபேசி எண்ணை வேறு யாருடனும் பகிர்ந்து கொள்ள மாட்டோம்", sharePassword: "உங்கள் கடவுச்சொல்லை வேறு யாருடனும் பகிர்ந்து கொள்ள மாட்டோம்",
    blankName: "பெயர் காலியாக இருக்க முடியாது", blankPhoneNumber: "தொலைபேசி எண் காலியாக இருக்கக்கூடாது", blankPassword: "கடவுச்சொல் காலியாக இருக்கக்கூடாது",
    SNO: "பட்டியல் எண்", AdminName: "நிர்வாகி பெயர்", ContactNumber: "தொடர்பு எண்", Description: "விளக்கம்", Modify: "தொடர்பு எண்", Show: "காண்பிக்க", Edit: "திருத்துதல்", Suspend: "இடைநீக்கம்", 
    Restore: "மீட்டமை", Delete: "அழி", Close: "மூடவும்", VillageName: "கிராமத்தின் பெயர்", Lists: "நிர்வாகிகளின் பட்டியல்கள்",Restored: "மீட்டெடுப்பு பட்டியல்கள்", NoAdmin: "நிர்வாகிகள் யாரும் இல்லை",
    AdminRestore: "மீட்டெடுக்க நிர்வாகிகள் இல்லை",ListsEvents:"நிகழ்வுகளின் பட்டியல்",EventTitle : "நிகழ்வு தலைப்பு",StartDate :"தொடக்க தேதி",
    EndDate : "கடைசி தேதி", NoEvents : "நிகழ்வுகள் எதுவும் திட்டமிடப்படவில்லை",AllProducts :"அனைத்து தயாரிப்புகளும்",MyProducts : "எனது தயாரிப்புகள்" , ListsProducts:"தயாரிப்புகளின் பட்டியல்கள்", ProductName:"பொருளின் பெயர்",Price:"விலை",
    NoProducts :"எந்த தயாரிப்புகளும் இல்லை",Quantity:"அளவு", Uploadimage :"படத்தை பதிவேற்றம் செய்யவும்",productname: "தயாரிப்பு பெயரை உள்ளிடவும்",Enterprice :"தயாரிப்பு விலை",Enterquantity:"அளவை உள்ளிடவும்",Enterdescription : "விளக்கத்தை உள்ளிடவும்",
    shareProductname : "உங்கள் தயாரிப்பின் பெயரை வேறு யாருடனும் பகிர்ந்து கொள்ள மாட்டோம்" , shareProductprice : "உங்கள் தயாரிப்பு படத்தை வேறு யாருடனும் பகிர்ந்து கொள்ள மாட்டோம்" ,  shareProductdetails  : "உங்கள் தயாரிப்பு விவரங்களை வேறு யாருடனும் பகிர்ந்து கொள்ள மாட்டோம்",
    EditProduct:"தயாரிப்பைத் திருத்தவும்", AddProduct : "தயாரிப்பு சேர்க்க",blankProduct :"தயாரிப்பின் பெயர் காலியாக இருக்கக்கூடாது", blankprice :"பொருளின் விலை காலியாக இருக்க முடியாது", blankquantity :"தயாரிப்பு அளவு காலியாக இருக்க முடியாது",
    blankdescription :"விளக்கம் காலியாக இருக்க முடியாது", deletemsg :"உங்கள் கணக்கை நீக்க கீழே கிளிக் செய்யவும்...", DeleteAccount : "கணக்கை நீக்குக",
    Welcome:"கிராம புதுப்பிப்பு பயன்பாட்டிற்கு வரவேற்கிறோம், இணைந்திருப்பதற்கும், உங்கள் கிராமத்தில் நடக்கும் அனைத்து நிகழ்வுகளைப் பற்றியும் அறிந்து கொள்வதற்கும் உங்களின் ஒரே இடமாகும்! பதிவுசெய்யப்பட்ட அனைத்து சமூக உறுப்பினர்களையும் எங்கள் தளம் ஒன்றிணைக்கிறது, வரவிருக்கும் நிகழ்வுகள், திட்டங்கள் மற்றும் உள்ளூர் செயல்பாடுகள் பற்றிய தகவல்களை அணுக தடையற்ற அனுபவத்தை வழங்குகிறது." ,
    comprehensive:"கிராம புதுப்பிப்பு செயலி மூலம், உங்கள் கிராமத்தில் நடைபெறும் நிகழ்வுகள் மற்றும் நிகழ்ச்சிகளின் விரிவான பட்டியலை நீங்கள் சிரமமின்றி உலாவலாம், குறிப்பிடத்தக்க எதையும் நீங்கள் தவறவிட மாட்டீர்கள்.",
    empower:"ஆனால் அதெல்லாம் இல்லை! எங்கள் பயனர்களுக்கு அவர்களின் படைப்பாற்றல் மற்றும் தொழில் முனைவோர் உணர்வை வெளிப்படுத்தும் வகையில், தனித்துவமான சந்தைப்படுத்தல் அம்சத்துடன் நாங்கள் அதிகாரமளிக்கிறோம். எங்கள் பிரத்யேகப் பக்கத்தில் உங்கள் சொந்த தயாரிப்புகளை உருவாக்கி, காட்சிப்படுத்துங்கள், அங்கு சக கிராமவாசிகள் உள்ளூர் வணிகங்களை ஆராய்ந்து ஆதரிக்கலாம்.",
    Join:"இப்போது எங்களுடன் சேர்ந்து, கிராமப் புதுப்பிப்பு ஆப்ஸ் மூலம் சமூகம், இணைப்பு மற்றும் செழிப்பு ஆகியவற்றின் உண்மையான சாரத்தை அனுபவிக்கவும்!"
}

const translationKa = {
    VILLAGE: "ಗ್ರಾಮ ನವೀಕರಣ ಅಪ್ಲಿಕೇಶನ್", Home: "ಮನೆ", village: "ಗ್ರಾಮ", Residents: "ನಿವಾಸಿಗಳು", Events: "ಕಾರ್ಯಕ್ರಮಗಳು", products: "ಉತ್ಪನ್ನಗಳು",
    DeleteAccount: "ಖಾತೆಯನ್ನು ಅಳಿಸಿ", admin: "ನಿರ್ವಾಹಕ", Register: "ನೋಂದಣಿ", Login: "ಲಾಗಿನ್", Logout: "ಲಾಗ್ ಔಟ್", Register: "ನೋಂದಾಯಿಸಿ", Admin: "ನಿರ್ವಹಣೆ", Name: "ಹೆಸರು",
    PhoneNumber: "ದೂರವಾಣಿ ಸಂಖ್ಯೆ", Password: "அಪಾಸ್ ವರ್ಡ್", name: "ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ", phonenumber: "ನಿಮ್ಮ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ", password: "ಪಾಸ್ವರ್ಡ್ ನಮೂದಿಸಿ", Create: "ರಚಿಸಿ", shareName: "ನಾವು ಎಂದಿಗೂ ನಿಮ್ಮ ಹೆಸರನ್ನು ಬೇರೆ ಯಾರೊಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳುವುದಿಲ್ಲ",
    sharePhoneNumber: "ನಿಮ್ಮ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಾವು ಎಂದಿಗೂ ಬೇರೆ ಯಾರೊಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳುವುದಿಲ್ಲ", sharePassword: "ನಾವು ನಿಮ್ಮ ಪಾಸ್ ವರ್ಡ್ ಅನ್ನು ಬೇರೆ ಯಾರೊಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳುವುದಿಲ್ಲ",
    blankName: "ಹೆಸರು ಖಾಲಿ ಇರುವಂತಿಲ್ಲ", blankPhoneNumber: "ಫೋನ್ ಸಂಖ್ಯೆ ಖಾಲಿ ಇರುವಂತಿಲ್ಲ", blankPassword: "ಪಾಸ್ವರ್ಡ್ ಖಾಲಿ ಇರುವಂತಿಲ್ಲ", SNO: "ಪಟ್ಟಿ ಸಂ", AdminName: "ನಿರ್ವಾಹಕರ ಹೆಸರು", ContactNumber: "ಸಂಪರ್ಕ ಸಂಖ್ಯೆ", Description: "ವಿವರಣೆ",
    Modify: "ಮಾರ್ಪಡಿಸಿ", Show: "ತೋರಿಸು", Edit: "ಸಂಪಾದನೆ", Suspend: "ಅಮಾನತುಗೊಳಿಸು", Restore: "ಪುನಃಸ್ಥಾಪನೆ", Delete: "ಅಳಿಸು", Close: "ಮುಚ್ಚು", VillageName: "ಹಳ್ಳಿಯ ಹೆಸರು", Lists: "ನಿರ್ವಾಹಕರ ಪಟ್ಟಿ",Restored: "ಪುನಃಸ್ಥಾಪನೆಯ ಪಟ್ಟಿಗಳು", NoAdmin: "ಯಾವುದೇ ನಿರ್ವಾಹಕರು ಲಭ್ಯವಿಲ್ಲ",
    AdminRestore: "ಮರುಸ್ಥಾಪಿಸಲು ಯಾವುದೇ ನಿರ್ವಾಹಕರು ಇಲ್ಲ",ListsEvents:"ಘಟನೆಗಳ ಪಟ್ಟಿ",EventTitle : "ಈವೆಂಟ್ ಶೀರ್ಷಿಕೆ" ,StartDate :"ಪ್ರಾರಂಭ ದಿನಾಂಕ",
    EndDate : "ಅಂತಿಮ ದಿನಾಂಕ", NoEvents : "ಯಾವುದೇ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ನಿಗದಿಪಡಿಸಲಾಗಿಲ್ಲ",AllProducts :"ಎಲ್ಲಾ ಉತ್ಪನ್ನಗಳು",MyProducts : "ನನ್ನ ಉತ್ಪನ್ನಗಳು" , ListsProducts:"ಎಲ್ಲಾ ಉತ್ಪನ್ನಗಳ ಪಟ್ಟಿಗಳು", ProductName:"ಉತ್ಪನ್ನದ ಹೆಸರು",Price:"ಉತ್ಪನ್ನ ಬೆಲೆ",
    NoProducts :"ಯಾವುದೇ ಉತ್ಪನ್ನಗಳು ಲಭ್ಯವಿಲ್ಲ",Quantity:"ಪ್ರಮಾಣ", Uploadimage :"ಚಿತ್ರವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ",productname: "ಉತ್ಪನ್ನದ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",Enterprice :"ಬೆಲೆ ನಮೂದಿಸಿ",Enterquantity:"ಪ್ರಮಾಣವನ್ನು ನಮೂದಿಸಿ",Enterdescription : " ವಿವರಣೆಯನ್ನು ನಮೂದಿಸಿ",
    shareProductname : "ನಿಮ್ಮ ಉತ್ಪನ್ನದ ಹೆಸರನ್ನು ನಾವು ಯಾರೊಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳುವುದಿಲ್ಲ" , shareProductprice : "ನಿಮ್ಮ ಉತ್ಪನ್ನದ ಬೆಲೆಯನ್ನು ನಾವು ಯಾರೊಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳುವುದಿಲ್ಲ" ,  shareProductdetails  : "ನಿಮ್ಮ ಉತ್ಪನ್ನದ ವಿವರಗಳನ್ನು ನಾವು ಯಾರೊಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳುವುದಿಲ್ಲ",
    EditProduct:" ಉತ್ಪನ್ನವನ್ನು ಸಂಪಾದಿಸಿ", AddProduct : "ಉತ್ಪನ್ನವನ್ನು ಸೇರಿಸಿ",blankProduct :"ಉತ್ಪನ್ನದ ಹೆಸರು ಖಾಲಿ ಇರುವಂತಿಲ್ಲ", blankprice :"ಉತ್ಪನ್ನದ ಬೆಲೆ ಖಾಲಿ ಇರುವಂತಿಲ್ಲ", blankquantity :"ಉತ್ಪನ್ನದ ಪ್ರಮಾಣವು ಖಾಲಿಯಾಗಿರಬಾರದು",
    blankdescription :"ವಿವರಣೆ ಖಾಲಿ ಇರುವಂತಿಲ್ಲ", deletemsg :"ನಿಮ್ಮ ಖಾತೆಯನ್ನು ಅಳಿಸಲು ಕೆಳಗೆ ಕ್ಲಿಕ್ ಮಾಡಿ...", DeleteAccount : "ಖಾತೆಯನ್ನು ಅಳಿಸಿ",
    Welcome:"ವಿಲೇಜ್ ಅಪ್‌ಡೇಟ್ ಆ್ಯಪ್‌ಗೆ ಸುಸ್ವಾಗತ, ಸಂಪರ್ಕದಲ್ಲಿರಲು ಮತ್ತು ನಿಮ್ಮ ಹಳ್ಳಿಯಲ್ಲಿ ನಡೆಯುವ ಎಲ್ಲಾ ಘಟನೆಗಳ ಬಗ್ಗೆ ಮಾಹಿತಿ ನೀಡಲು ನಿಮ್ಮ ಏಕ-ನಿಲುಗಡೆ ತಾಣವಾಗಿದೆ! ನಮ್ಮ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಎಲ್ಲಾ ನೋಂದಾಯಿತ ಸಮುದಾಯ ಸದಸ್ಯರನ್ನು ಒಟ್ಟುಗೂಡಿಸುತ್ತದೆ, ಮುಂಬರುವ ಈವೆಂಟ್‌ಗಳು, ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಸ್ಥಳೀಯ ಚಟುವಟಿಕೆಗಳ ಮಾಹಿತಿಯನ್ನು ಪ್ರವೇಶಿಸಲು ತಡೆರಹಿತ ಅನುಭವವನ್ನು ಒದಗಿಸುತ್ತದೆ." ,
    comprehensive:"ವಿಲೇಜ್ ಅಪ್‌ಡೇಟ್ ಅಪ್ಲಿಕೇಶನ್‌ನೊಂದಿಗೆ, ನಿಮ್ಮ ಗ್ರಾಮದಲ್ಲಿ ನಡೆಯುತ್ತಿರುವ ಈವೆಂಟ್‌ಗಳು ಮತ್ತು ಕಾರ್ಯಕ್ರಮಗಳ ಸಮಗ್ರ ಪಟ್ಟಿಯನ್ನು ನೀವು ಸಲೀಸಾಗಿ ಬ್ರೌಸ್ ಮಾಡಬಹುದು, ನೀವು ಎಂದಿಗೂ ಗಮನಾರ್ಹವಾದದ್ದನ್ನು ಕಳೆದುಕೊಳ್ಳುವುದಿಲ್ಲ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಬಹುದು.",
    empower:"ಆದರೆ ಅಷ್ಟೆ ಅಲ್ಲ! ನಾವು ನಮ್ಮ ಬಳಕೆದಾರರಿಗೆ ವಿಶಿಷ್ಟವಾದ ಮಾರ್ಕೆಟಿಂಗ್ ವೈಶಿಷ್ಟ್ಯದೊಂದಿಗೆ ಅಧಿಕಾರ ನೀಡುತ್ತೇವೆ, ಅವರ ಸೃಜನಶೀಲತೆ ಮತ್ತು ಉದ್ಯಮಶೀಲತೆಯ ಮನೋಭಾವವನ್ನು ಪ್ರದರ್ಶಿಸಲು ಅನುವು ಮಾಡಿಕೊಡುತ್ತದೆ. ನಮ್ಮ ಮೀಸಲಾದ ಪುಟದಲ್ಲಿ ನಿಮ್ಮ ಸ್ವಂತ ಉತ್ಪನ್ನಗಳನ್ನು ರಚಿಸಿ ಮತ್ತು ಪ್ರದರ್ಶಿಸಿ, ಅಲ್ಲಿ ಸಹ ಗ್ರಾಮಸ್ಥರು ಸ್ಥಳೀಯ ವ್ಯಾಪಾರಗಳನ್ನು ಅನ್ವೇಷಿಸಬಹುದು ಮತ್ತು ಬೆಂಬಲಿಸಬಹುದು.",
    Join:"ಇದೀಗ ನಮ್ಮೊಂದಿಗೆ ಸೇರಿ ಮತ್ತು ವಿಲೇಜ್ ಅಪ್‌ಡೇಟ್ ಅಪ್ಲಿಕೇಶನ್ ಮೂಲಕ ಸಮುದಾಯ, ಸಂಪರ್ಕ ಮತ್ತು ಸಮೃದ್ಧಿಯ ನಿಜವಾದ ಸಾರವನ್ನು ಅನುಭವಿಸಿ!"
}


i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: translationEn },
            te: { translation: translationTe },
            ta: { translation: translationTa },
            ka: { translation: translationKa }
        },
        lng: "en",
        fallbacklng: "en",
        interpolation: { escapeValue: false },
    })


const Container = (props) => {
    const dispatch = useDispatch()
    const [isLogged, setIsLogged] = useState(false)
    const { t } = useTranslation()

    const data = useSelector((state) => {
        return state.users.userDetails
    })

    const handleLanguageChange = (e) => {
        i18n.changeLanguage(e.target.value)
    }


    useEffect(() => {
        if (data?.hasOwnProperty('phoneNumber')) {
            setIsLogged(true)
        } else if (localStorage.getItem('token')) {
            dispatch(asyncAccountDetails(localStorage.getItem('token'), props, setIsLogged))

        }

    }, [data])



    return (

        <div >
            {
                isLogged && data.role !== 'superAdmin' && data.role !== 'resident' ?

                    (
                        <div className="container-fluid">
                            <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "green" }}>
                                <h1 className="navbar-brand" ><span style={{ backgroundColor: "gold" }}>{t("VILLAGE")}</span></h1>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                    <ul className="navbar-nav mr-auto">
                                         <li className="nav-item active">
                                            <li><Link className="nav-link" to='/home' style={{ color: "white" }}>{t("Home")}</Link></li>
                                        </li>
                                        <li className="nav-item active">
                                            <li><Link className="nav-link" to='/village' style={{ color: "white" }}>{t("Village")}</Link></li>
                                        </li>
                                        <li className="nav-item active">
                                            <li><Link className="nav-link" to='/residents' style={{ color: "white" }}>{t("Residents")}</Link></li>
                                        </li>
                                        <li className="nav-item active">
                                            <li><Link className="nav-link" to='/events' style={{ color: "white" }}>{t("Events")}</Link></li>
                                        </li>
                                        <li className="nav-item active">
                                            <li><Link className="nav-link" to='/products' style={{ color: "white" }}>{t("products")}</Link></li>
                                        </li>
                                        <li className="nav-item active">
                                            <li><Link className="nav-link" to='/deleteaccount' style={{ color: "white" }}>{t("DeleteAccount")}</Link></li>
                                        </li>
                                        <li className="nav-item active">
                                            <li><Link className="nav-link" to='#' style={{ color: "white" }} onClick={() => {
                                                Swal.fire('successfully logged out')
                                                localStorage.clear()
                                                props.history.push('/')
                                                setIsLogged(false)
                                            }}>{t("Logout")}</Link></li>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>

                    ) : (isLogged && data.role === 'superAdmin') ?
                        (
                            <div className="container-fluid">
                                <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "green" }}>
                                    <h1 className="navbar-brand" ><span style={{ backgroundColor: "gold" }}>{t("VILLAGE")}</span></h1>
                                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                        <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
                                            <li className="nav-item active">
                                                <li><Link className="nav-link" to='/admin' style={{ color: "white" }}>{t("Admin")}</Link></li>
                                            </li>
                                            <li className="nav-item active">
                                                <li><Link className="nav-link" to='#' style={{ color: "white" }} onClick={() => {
                                                    Swal.fire('successfully logged out')
                                                    localStorage.clear()
                                                    props.history.push('/')
                                                    setIsLogged(false)
                                                }}>{t("Logout")}</Link></li>
                                            </li>
                                        </ul>
                                        <span className="navbar-text">
                                           <select name='language' onChange={handleLanguageChange}>
                                                <option value="en">English</option>
                                                <option value="te">Telugu</option>
                                                <option value="ta">Tamil</option>
                                                <option value="ka">Kannada</option>
                                            </select>
                                        </span>
                                    </div>
                                </nav>
                            </div>
                        ) : (isLogged && data.role === 'resident') ?

                            <div className="container-fluid">
                                <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "green" }}>
                                    <h1 className="navbar-brand" ><span style={{ backgroundColor: "gold" }}>{t("VILLAGE")}</span></h1>
                                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                            <li className="nav-item active">
                                                <li><Link className="nav-link" to='/home' style={{ color: "white" }}>{t("Home")}</Link></li>
                                            </li>
                                            <li className="nav-item active">
                                                <li><Link className="nav-link" to='/events' style={{ color: "white" }}>{t("Events")}</Link></li>
                                            </li>
                                            <li className="nav-item active">
                                                <li><Link className="nav-link" to='/products' style={{ color: "white" }}>{t("products")}</Link></li>
                                            </li>
                                            <li className="nav-item active">
                                                <li><Link className="nav-link" to='/deleteaccount' style={{ color: "white" }}>{t("DeleteAccount")}</Link></li>
                                            </li>
                                            <li className="nav-item active">
                                                <li><Link className="nav-link" to='#' style={{ color: "white" }} onClick={() => {
                                                    Swal.fire('successfully logged out')
                                                    localStorage.clear()
                                                    props.history.push('/')
                                                    setIsLogged(false)
                                                }}>{t("Logout")}</Link></li>
                                            </li>
                                        </ul>
                                        <span className="navbar-text">
                                    
                                    <select name='language' onChange={handleLanguageChange}>
                                        <option value="en">English</option>
                                        <option value="te">Telugu</option>
                                        <option value="ta">Tamil</option>
                                        <option value="ka">Kannada</option>
                                    </select>
                                </span>
                                    </div>
                                </nav>
                            </div>


                            :

                            <div className="container-fluid">
                                <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "green" }}>
                                    <h1 className="navbar-brand" ><span style={{ backgroundColor: "gold" }}>{t("VILLAGE")}</span></h1>
                                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                        <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
                                            <li className="nav-item active">
                                                <li><Link className="nav-link" to='/register' style={{ color: "white" }}>{t("Register")}</Link></li>
                                            </li>
                                            <li className="nav-item active">
                                                <li><Link className="nav-link" to='/' style={{ color: "white" }}>{t("Login")}</Link></li>
                                            </li>
                                        </ul>
                                        <span className="navbar-text">
                                    
                                            <select name='language' onChange={handleLanguageChange}>
                                                <option value="en">English</option>
                                                <option value="te">Telugu</option>
                                                <option value="ta">Tamil</option>
                                                <option value="ka">Kannada</option>
                                            </select>
                                        </span>
                                    </div>
                                </nav>
                            </div>
            }
            {isLogged && data.role !== 'superAdmin' ?
                (<div>

                    <Route path='/home' exact={true}  render={(props) => {
                            return   <Home  {...props} t={t}  />
                        }} />
                    <Route path='/village' component={Village} exact={true} />
                    <Route path='/residents' component={Residents} exact={true} />
                    <Route path='/events'  exact={true}  render={(props) => {
                            return   <Events  {...props} t={t}  />
                        }} />
                    <Route path='/products'  exact={true} render={(props) => {
                            return   <Products  {...props} t={t}  />
                        }} />
                    <Route path='/deleteaccount' render={(props) => {
                        return <DeleteAccount  {...props} setIsLogged={setIsLogged} t={t} />
                    }} />
                </div>)
                : (isLogged && data.role === 'superAdmin') ?
                    (
                        <div>
                            <Route path='/admin' render={(props) => {
                                return <Admin  {...props} t={t}  />
                            }} />
                        </div>
                    )

                    :
                 <div>
                  
                 
                        <Route path='/register'  exact={true} render={(props) => {
                            return   <Register  {...props} t={t}  />
                        }} />
                        <Route path='/' exact={true} render={(props) => {
                            return <Login  {...props} setIsLogged={setIsLogged} t={t} />
                        }} />
                         
                    </div>
                 
                   
                    
            }

        </div>
    )
}
export default withRouter(Container)