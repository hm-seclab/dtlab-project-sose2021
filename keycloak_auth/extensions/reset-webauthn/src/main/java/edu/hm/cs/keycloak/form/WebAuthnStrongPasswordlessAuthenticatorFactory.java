package edu.hm.cs.keycloak.form;

import org.keycloak.authentication.authenticators.browser.WebAuthnPasswordlessAuthenticatorFactory;

public class WebAuthnStrongPasswordlessAuthenticatorFactory extends WebAuthnPasswordlessAuthenticatorFactory {

    public static final String PROVIDER_ID = "webauthn-strong-passwordless";

    @Override
    public String getDisplayType() {
        return "WebAuthn Strong Passwordless Authenticator";
    }

    @Override
    public String getHelpText() {
        return "Authenticator for strong Passwordless WebAuthn authentication";
    }

    @Override
    public String getId() {
        return PROVIDER_ID;
    }

    @Override
    public boolean isUserSetupAllowed() {
        return false;
    }

}
