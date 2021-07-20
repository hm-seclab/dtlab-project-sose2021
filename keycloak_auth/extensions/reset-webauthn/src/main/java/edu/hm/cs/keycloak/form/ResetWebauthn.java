package edu.hm.cs.keycloak.form;

import org.keycloak.authentication.AuthenticationFlowContext;
import org.keycloak.authentication.authenticators.resetcred.AbstractSetRequiredActionAuthenticator;
import org.keycloak.authentication.requiredactions.WebAuthnPasswordlessRegisterFactory;

public class ResetWebauthn extends AbstractSetRequiredActionAuthenticator {

    @Override
    public String getDisplayType() {
        return "Reset Webauthn";
    }

    @Override
    public String getReferenceCategory() {
        return "Reset Webauthn";
    }

    @Override
    public void authenticate(AuthenticationFlowContext authenticationFlowContext) {
        authenticationFlowContext.getAuthenticationSession().addRequiredAction(WebAuthnPasswordlessRegisterFactory.PROVIDER_ID);
        authenticationFlowContext.success();
    }

    @Override
    public String getHelpText() {
        return "Reset Webauthn";
    }

    @Override
    public String getId() {
        return "reset-webauthn";
    }
}
